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
