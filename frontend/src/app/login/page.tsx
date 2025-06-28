"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import { ConnectWalletButton } from "@/components/features/wallet/ConnectWalletButton";

function LoginForm() {
  const { login, isLoading } = useAuth();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      console.log("Newly registered user!");
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, senha: password });
  };

  return (
    <div className="flex flex-col justify-center h-full w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">Login</h1>
        <p className="text-lg text-muted-foreground mt-4">Find, Create and Monetize AI Agents</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Field */}
        <div className="space-y-3">
          <Label htmlFor="email" className="text-base text-white">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="!bg-[#1E1E1E] border-zinc-700 h-14 rounded-lg text-white text-base"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-3">
          <Label htmlFor="password" className="text-base text-white">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="!bg-[#1E1E1E] border-zinc-700 h-14 rounded-lg text-white text-base"
          />
        </div>

        <div className="text-right">
            <Link href="/forgot-password" className="text-md text-muted-foreground hover:text-white transition-colors">
                Forgot Password
            </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 pt-6 items-center justify-center">
          <Button type="submit" className="w-75 h-14 text-lg font-semibold rounded-[20px] " disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Button variant="outline" asChild className="w-75 h-14 text-lg font-semibold !border-primary text-white hover:bg-primary/10 hover:text-primary rounded-[20px]">
            <Link href="/register">
              Register
            </Link>
          </Button>
          <ConnectWalletButton></ConnectWalletButton>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
        
        <div className="hidden lg:flex justify-center items-center">
          <div className="w-full h-[600px] bg-[#C4C4C4] rounded-2xl"></div>
        </div>
        
        <div className="flex justify-center">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>

      </div>
    </div>
  );
}
