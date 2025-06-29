// src/types/index.ts

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (data: LoginCredentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  role: 'Creator' | 'Enterprise' | string;
}

// Tipo para as credenciais enviadas no login.
export interface LoginCredentials {
  email: string;
  password: any;
}

// Tipo para os dados enviados no registro.
export interface RegistrationData extends LoginCredentials {
  name: string;
  address: string;
  role: 'Creator' | 'Enterprise';
  enterprise: string; 
  sector: string; 
  telephone: string; 
}

// Este tipo corresponde exatamente à estrutura do JSON que seu backend retorna
export type Agent = {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  pricePerCall: string;
  createdAt: string;
  creatorId: number;
  imageUrl: string | null;
  specialty: string;
  useCases: string; // No seu JSON, 'useCases' é uma string única
  creator: {
    name: string;
    email: string;
    walletAddress: string;
  };
};

export type ContractWithDetails = {
  id: string;
  userId: number;
  agentId: string;
  callsPurchased: number;
  callsRemaining: number;
  paymentTxHash: string;
  createdAt: string;
  Agent: {
    name: string;
    description: string;
    imageUrl: string | null;
    endpoint: string;
  };
  apiKey: {
    key: string;
  } | null;
};

export type AISearchResult = {
  recommendedAgent: Agent;
  reasoning: string;
  confidence: number;
};

export interface AgentAI {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
}

export interface SearchResult {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    score: number;
}