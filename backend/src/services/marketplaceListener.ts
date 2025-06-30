import { ethers } from 'ethers';
import NFTMarketplaceAbi from '../contracts/abis/Marketplace.json';
import prisma from '../config/db';

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(process.env.NFT_MARKETPLACE_ADDRESS!, NFTMarketplaceAbi, provider);

export const startMarketplaceListener = () => {
  contract.on('Bought', async (buyer, nftAddress, tokenId, price) => {
    try {
      const agent = await prisma.agent.findFirst({ where: { nftTokenId: Number(tokenId) } });
      const user = await prisma.user.findUnique({ where: { walletAddress: buyer.toLowerCase() } });

      if (!agent || !user) return;

      const createdContract = await prisma.contract.create({
        data: {
          userId: user.id,
          agentId: agent.id,
          callsPurchased: 100,
          callsRemaining: 100,
          paymentTxHash: 'onchain'
        },
      });

      await prisma.apiKey.create({
        data: {
          key: crypto.randomUUID(),
          contractId: createdContract.id,
        },
      });

      console.log(`Contrato criado: ${user.email} comprou acesso ao agente ${agent.name}`);
    } catch (err) {
      console.error(' Erro no listener:', err);
    }
  });

  console.log('🎧 Listener do NFTMarketplace ativo!');
};
