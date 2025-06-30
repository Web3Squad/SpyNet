import { Request, RequestHandler, Response } from 'express';
import axios from 'axios';

/**
 * Atua como um proxy para o endpoint real do agente.
 * Esta função é chamada DEPOIS que o middleware `apiKeyAuth` validou a chave
 * e debitou um crédito do contrato.
 */
export const proxyAgentCall: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  // 1. O middleware 'apiKeyAuth' já injetou o contrato na requisição
  const contract = (req as any).contract;

  // 2. Validação: Verificamos se o contrato e o endpoint do agente existem
  if (!contract?.Agent?.endpoint) {
    res.status(400).json({ 
      error: 'Endpoint do agente não encontrado ou contrato inválido.' 
    });
    return;
  }

  const agentEndpoint = contract.Agent.endpoint;

  // O corpo da requisição (req.body) contém os dados que o usuário final
  // quer enviar para o agente de IA (ex: { "prompt": "some text" }).
  // Vamos encaminhar este corpo diretamente.
  const payload = req.body;
  
  console.log(`[PROXY] Encaminhando chamada para: ${agentEndpoint}`);

  try {
    // 3. Faz a chamada real para o endpoint do agente usando axios
    const agentResponse = await axios.post(agentEndpoint, payload, {
      // Opcional: encaminhar alguns headers, se necessário. Para a maioria dos casos, não é preciso.
      // headers: { 'Content-Type': 'application/json' }
    });

    // 4. Retorna a RESPOSTA REAL do agente para o usuário final
    // O status e os dados da resposta do agente são repassados integralmente.
    res.status(agentResponse.status).json(agentResponse.data);
    // Não retorne explicitamente o objeto de resposta

  } catch (error: any) {
    console.error(`[ERRO NO PROXY] Falha ao chamar ${agentEndpoint}:`, error.message);
    
    // Se a chamada para o agente falhar, retornamos um erro claro.
    // É importante retornar o status do erro do agente, se disponível.
    res.status(error.response?.status || 500).json({ 
      error: 'O agente de destino retornou um erro ou está indisponível.',
      details: error.response?.data || 'Não foi possível completar a chamada.'
    });
    // Não retorne explicitamente o objeto de resposta
  }
};