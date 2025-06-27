// src/app/login/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import { useAccount } from "wagmi";
import { WalletConnect } from "@/components/features/wallet/WalletConnect";

function LoginForm() {
  const { login, isLoading } = useAuth();
  const { isConnected, address } = useAccount();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // useEffect para verificar o parâmetro 'registered' na URL.
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setShowSuccessMessage(true);
      // Opcional: esconde a mensagem após 5 segundos.
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, senha: password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Acesse sua conta para continuar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mensagem de sucesso de cadastro */}
          {showSuccessMessage && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
              Cadastro realizado com sucesso! Por favor, faça o login.
            </div>
          )}

          {/* Seção de Conexão da Carteira Integrada */}
          <div className="p-4 border rounded-md">
            {isConnected ? (
              <div>
                <Label>Carteira Conectada</Label>
                <p className="text-sm font-medium text-green-600 truncate">
                  Você já está conectado como: {address}
                </p>
              </div>
            ) : (
              <div>
                <Label>Conectar Carteira (Opcional)</Label>
                <div className="mt-2">
                  <WalletConnect />
                </div>
              </div>
            )}
          </div>

          {/* Campos de Login Tradicional */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-semibold text-blue-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}


export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Suspense fallback={<div>Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
