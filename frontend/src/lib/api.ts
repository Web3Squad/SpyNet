import { Agent, AISearchResult } from "../types"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllAgents(): Promise<Agent[]> {
  try {
    const response = await fetch(`${API_URL}/agent/list`, {
      cache: 'no-cache', 
    });
    if (!response.ok) {
      throw new Error('Falha ao buscar agentes.');
    }
    return await response.json();
  } catch (error) {
    console.error('[API ERROR] getAllAgents:', error);
    return []; 
  }
}

export async function getAgentById(id: string): Promise<Agent | null> {
  try {
    const response = await fetch(`${API_URL}/agent/${id}`, {
      cache: 'no-cache',
    });
    if (!response.ok) {
      if(response.status === 404) return null; 
      throw new Error(`Falha ao buscar o agente ${id}.`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[API ERROR] getAgentById (${id}):`, error);
    return null; 
  }
}

export async function findBestAgent(userQuery: string): Promise<AISearchResult | null> {
  try {
    const response = await fetch(`${API_URL}/agent/find-best`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userQuery }),
    });

    if (!response.ok) {
     
      const errorData = await response.json();
      throw new Error(errorData.error || 'Falha na busca com IA.');
    }

    return await response.json();
  } catch (error) {
    console.error('[API ERROR] findBestAgent:', error);
    return null; 
  }
}
