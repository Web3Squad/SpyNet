"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider";
import { ConnectWalletButton } from "@/components/features/wallet/ConnectWalletButton";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";

// The form component containing all logic
function LoginForm() {
  const { login, isLoading } = useAuth();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Effect to detect if the user has just registered
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      // You can use a toast here to welcome the new user!
      // E.g.: toast.success("Registration successful! Please log in.");
      console.log("Newly registered user!");
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password: password });
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
            placeholder="your@email.com"
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
            placeholder="••••••••"
          />
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col gap-4 pt-6 items-center justify-center">
          <Button
            type="submit"
            className="w-full max-w-xs h-14 text-lg font-semibold rounded-[20px] flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size={24} />
                <span>Signing in...</span>
              </>
            ) : (
              'Sign in'
            )}
          </Button>

          <Button
            variant="outline"
            asChild
            className="w-full max-w-xs h-14 text-lg font-semibold !border-primary text-white hover:bg-primary/10 hover:text-primary rounded-[20px]"
          >
            <Link href="/register">
              Register
            </Link>
          </Button>
          {/*           
          <div className="relative w-full max-w-xs my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                OR
              </span>
            </div>
          </div> */}

          {/* <ConnectWalletButton /> */}
        </div>
      </form>
    </div>
  );
}


// The page component that organizes the overall layout
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-background p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">

        {/* Image Column (Left) */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="w-full h-[750px] bg-zinc-800 rounded-2xl animate-pulse">
            {/* You can put a Next.js <Image/> here */}
            <img
              src="/img/dashboard/image.png"
              alt="Login Illustration"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Form Column (Right) */}
        <div className="flex flex-col justify-start min-h-[750px]">
          {/* Suspense is necessary because LoginForm uses 'useSearchParams' */}
          <Suspense fallback={
            <div className="flex justify-center items-center h-full">
              <LoadingSpinner />
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>

      </div>
    </div>
  );
}