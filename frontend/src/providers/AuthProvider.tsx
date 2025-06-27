// src/providers/AuthProvider.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { loginUser, registerUser } from '@/services/authService';
import type { AuthContextType, User, LoginCredentials, RegistrationData } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuth = (authToken: string, userData: User) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  const login = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      const responseData = typeof response === 'string' ? JSON.parse(response) : response;
      const userData: User = {
        user_id: responseData.user_id,
        name: responseData.name,
        email: responseData.email,
      };
      handleAuth(responseData.access_token, userData);
      // Após o login, redireciona para a página principal ou dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegistrationData) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      router.push('/login?registered=true');
    } catch (error) {
      console.error(error);
      alert('Erro ao registrar. Verifique o console.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
