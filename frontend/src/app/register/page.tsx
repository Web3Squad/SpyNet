// src/app/register/page.tsx
"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletConnect } from "@/components/features/wallet/WalletConnect";
import { useAuth } from "@/providers/AuthProvider";
import { useAccount } from "wagmi";

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const { address, isConnected } = useAccount();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) {
      alert("Por favor, conecte sua carteira primeiro!");
      return;
    }
    register({
      name,
      email,
      senha: password,
      address,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>Crie sua conta e conecte sua carteira para começar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md">
              <Label>Passo 1: Conecte sua Carteira</Label>
              <div className="mt-2">
                <WalletConnect />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)} required disabled={!isConnected} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={!isConnected} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={!isConnected} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" disabled={!isConnected || isLoading}>
              {isLoading ? 'Registrando...' : 'Registrar'}
            </Button>
             <p className="mt-4 text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                Faça o login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
