// src/controllers/agentController.ts
import { RequestHandler } from 'express';
import { registerAgentService, getAllAgentsService, getAgentByIdService, updateAgentService, deleteAgentService} from '../services/agentService';
import { Request, Response } from 'express';
import { uploadImageToSupabase } from '../services/uploadService';
import { findBestAgentWithAI } from '../services/aiService';
import { ethers, Log } from 'ethers';
import { getERC721Contract } from '../contracts/customErc721';
import { getMarketplaceContract } from '../contracts/nftMarketplace';

export const registerAgent: RequestHandler = async (req, res) => {
  const {
    name,
    description,
    endpoint,
    pricePerCall, // Pode ser string, número ou objeto
    specialty,
    useCases,
    imageUrl,
    nftTokenId
  } = req.body;

  const creatorEmail = req.user?.sub;

  if (!name || !description || !endpoint || !pricePerCall || !specialty || !useCases || !nftTokenId) {
    res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  if (!creatorEmail) {
    res.status(401).json({ error: 'Criador não autenticado.' });
  }

  try {

    let parsedPrice: string;

    if (typeof pricePerCall === 'object' && pricePerCall !== null) {
      // Verifica se o objeto tem a propriedade 'value' e se ela é uma string ou número
      if (('value' in pricePerCall) && (typeof pricePerCall.value === 'string' || typeof pricePerCall.value === 'number')) {
        parsedPrice = pricePerCall.value.toString();
      } else {
        res.status(400).json({ error: 'Campo pricePerCall malformado. Objeto deve conter a chave "value".' });
      }
    } else if (typeof pricePerCall === 'string' || typeof pricePerCall === 'number') {
      parsedPrice = pricePerCall.toString();
    } else {
      res.status(400).json({ error: 'Campo pricePerCall com tipo inválido.' });
    }

    const agent = await registerAgentService(
      name,
      description,
      endpoint,
      // Usamos parseFloat para manter a consistência com `postAgent`
      parseFloat(parsedPrice),
      creatorEmail,
      specialty,
      useCases,
      imageUrl,
      nftTokenId
    );

    res.status(201).json(agent);
  } catch (error: any) {
    // Adicionar um log mais detalhado no servidor ajuda a depurar
    console.error('[ERRO registerAgent]', error);
    res.status(500).json({
      error: 'Erro ao registrar o agente.',
      details: error.message
    });
  }
};


export const getAllAgents: RequestHandler = async (_, res) => {
  try {
    const agents = await getAllAgentsService();
    res.status(200).json(agents);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar agentes.' });
  }
};

export const getAgentById: RequestHandler = async (req, res) => {
  try {
    const agent = await getAgentByIdService(req.params.id);
    if (!agent) {
       res.status(404).json({ error: 'Agente não encontrado.' });
    }
     res.json(agent);
  } catch {
     res.status(500).json({ error: 'Erro ao buscar o agente.' });
  }
};

export const updateAgent: RequestHandler = async (req, res) => {
  try {
    const updated = await updateAgentService(req.params.id, req.body);
     res.json(updated);
  } catch {
     res.status(500).json({ error: 'Erro ao atualizar o agente.' });
  }
};

export const deleteAgent: RequestHandler = async (req, res) => {
  try {
    await deleteAgentService(req.params.id);
     res.status(204).send();
  } catch {
     res.status(500).json({ error: 'Erro ao deletar o agente.' });
  }
};

export const postAgent: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, description, endpoint, pricePerCall, specialty, useCases } = req.body;
    const file = req.file;
    const creatorEmail = req.user?.sub;

    if (!name || !description || !endpoint || !pricePerCall || !specialty || !useCases || !creatorEmail) {
      res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    // ✅ Inicializa parsedPrice para evitar erro TS2454
    let parsedPrice: string = '';

    if (typeof pricePerCall === 'object' && pricePerCall !== null) {
      if ('value' in pricePerCall && (typeof pricePerCall.value === 'string' || typeof pricePerCall.value === 'number')) {
        parsedPrice = pricePerCall.value.toString();
      } else {
        res.status(400).json({ error: 'Campo pricePerCall malformado. Objeto deve conter a chave "value".' });
      }
    } else if (typeof pricePerCall === 'string' || typeof pricePerCall === 'number') {
      parsedPrice = pricePerCall.toString();
    } else {
      res.status(400).json({ error: 'Campo pricePerCall com tipo inválido.' });
    }

    let imageUrl: string = '';
    if (file) {
      const fileName = `${Date.now()}_${file.originalname}`;
      const imageBuffer = file.buffer;
      const contentType = file.mimetype;
      imageUrl = await uploadImageToSupabase(imageBuffer, fileName, contentType);
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PLATFORM_PRIVATE_KEY!, provider);

    const nftContract = getERC721Contract(signer);
    const marketplace = getMarketplaceContract(signer);

    const to = await signer.getAddress();

    const mintTx = await nftContract.mint(to);
    console.log(`- Transação de Mint enviada: ${mintTx.hash}`);
    const mintReceipt = await provider.waitForTransaction(mintTx.hash, 1, 60000);
    if (!mintReceipt) {
      throw new Error("A transação de Mint não foi confirmada a tempo.");
    }

    const transferEvent = mintReceipt.logs.find((log: any) => log.eventName === 'Transfer') as Log | undefined;
    if (!transferEvent || !('args' in transferEvent)) {
      throw new Error("Não foi possível encontrar o evento de Transferência para obter o tokenId.");
    }

    const tokenId = (transferEvent as any).args.tokenId.toString();
    console.log(`- NFT ${tokenId} mintado com sucesso.`);

    const priceInWei = ethers.parseUnits(parsedPrice, 18);
    const approveTx = await nftContract.approve(marketplace.target, tokenId);
    console.log(`- Transação de Approve enviada: ${approveTx.hash}`);
    await provider.waitForTransaction(approveTx.hash, 1, 60000);
    console.log(`- Aprovado NFT ${tokenId} para o marketplace ${marketplace.target}`);

    const listTx = await marketplace.listNFT(nftContract.target, tokenId, priceInWei);
    console.log(`- Transação de ListNFT enviada: ${listTx.hash}`);
    await provider.waitForTransaction(listTx.hash, 1, 60000);
    console.log(`- Listado NFT ${tokenId} por ${parsedPrice} ETH`);

    const agent = await registerAgentService(
      name,
      description,
      endpoint,
      parseFloat(parsedPrice),
      creatorEmail,
      specialty,
      useCases,
      imageUrl,
      parseInt(tokenId, 10)
    );

    res.status(201).json(agent);

  } catch (error: any) {
    console.error('[ERRO postAgent]', error);
    res.status(500).json({
      error: 'Erro ao registrar o agente.',
      details: error.message,
      stack: error.stack
    });
  }
};
