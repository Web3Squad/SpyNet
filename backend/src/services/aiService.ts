import axios from 'axios';
interface Agent {
  id: string;
  name: string;
  description: string;
  specialty: string;
  useCases: string;
}

const GEMINI_API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const findBestAgentWithAI = async (agents: Agent[], userQuery: string) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('A chave da API da Gemini não está configurada no servidor.');
  }

  const prompt = `
  You are an expert assistant in an AI agent marketplace. Your task is to analyze a list of available agents and recommend the best one based on the user's need.

  **Context:**
  Below is a list of available agents in JSON format. Analyze the "name", "description", "specialty", and "useCases" fields of each to make your decision.

  **Agent List:**
  ${JSON.stringify(agents, null, 2)}

  **User Need:**
  "${userQuery}"

  **Your Task:**
  1. Analyze the user's need and the list of agents.
  2. Identify the agent that best matches the request.
  3. Your response MUST BE STRICTLY a JSON object, with no additional text or formatting.
  
  The JSON response object must have the following format:
  {
    "bestAgentId": "the_id_of_the_chosen_agent",
    "reasoning": "A short explanation in English of why you chose this agent.",
    "confidenceScore": a_number_from_0_to_1_representing_your_confidence
  }
`;


  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = response.data as {
      candidates: { content: { parts: { text: string }[] } }[];
    };

    const generatedContent = data.candidates[0].content.parts[0].text;

    
    const match = generatedContent.match(/{[\s\S]*}/);

    if (!match) {
      throw new Error("A resposta da IA não continha um objeto JSON válido.");
    }
    
    const jsonString = match[0];
    const aiResponse = JSON.parse(jsonString);
    
    return aiResponse;

  } catch (error: any) {
    console.error("Erro ao chamar ou processar a resposta da API da Gemini:", error.response?.data || error.message);
    throw new Error('Falha ao comunicar com o serviço de IA.');
  }
};