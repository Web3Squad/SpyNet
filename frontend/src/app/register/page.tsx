"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletConnectModal } from "@/components/features/wallet/WalletConnectModal";

// Hooks
import { useAuth } from "@/providers/AuthProvider";
import { useAccount } from "wagmi";
import { Rocket } from "lucide-react";

// Tipo para os dados do formulário
type FormData = {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  sector: string;
  password: string;
  role: 'creator' | 'enterprise';
};

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const { address, isConnected } = useAccount();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    sector: '',
    password: '',
    role: 'creator',
  });

  const [finalFormData, setFinalFormData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setFinalFormData(formData);
    setStep(2);
  };

  useEffect(() => {
    if (step === 2 && isConnected && address && finalFormData && !isSubmitting) {
      setIsSubmitting(true);
      console.log("Iniciando registro (execução única) com os dados:", finalFormData);
      register({
        name: finalFormData.name,
        email: finalFormData.email,
        address: address,
        role: finalFormData.role === 'enterprise' ? 'Enterprise' : 'Creator',
        sector: finalFormData.sector,
        password: finalFormData.password,
        enterprise: finalFormData.companyName,
        telephone: finalFormData.phone,
      });
    }
  }, [step, isConnected, address, finalFormData, isSubmitting, register, router]);


  return (
    <div className="flex justify-center min-h-screen bg-background p-4 py-16">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 lg:gap-24 items-start">
      
      {/* Coluna da Imagem (Esquerda) */}
      <div className="hidden lg:flex justify-center items-start">
        <div className="w-full h-full rounded-2xl flex animate-pulse">
        <img
          src="/img/home/cogumelo.png"
          alt="Register Illustration"
          className="w-full h-full object-cover rounded-2xl"
          style={{ maxHeight: "700px", height: "100%" }}
        />
        </div>
      </div>

        {/* Coluna do Formulário (Direita) */}
        <div className="flex justify-center items-stretch">
          {step === 1 ? (
            <div className="w-full max-w-md flex flex-col justify-center h-full">
              <div className="mb-10 text-left">
                <h1 className="text-5xl font-bold text-white">Register</h1>
                <p className="text-lg text-muted-foreground mt-4">
                  Share your innovation with the world and monetize your skills.
                </p>
              </div>
              <form onSubmit={handleContinue} className="space-y-6">
                <Tabs value={formData.role} onValueChange={(value) => setFormData(p => ({ ...p, role: value as 'creator' | 'enterprise' }))}>
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-800 h-12 rounded-full inline-flex">
                    <TabsTrigger value="creator" className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full">
                      Creator
                    </TabsTrigger>
                    <TabsTrigger value="enterprise" className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full">
                      Company
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input id="name" value={formData.name} onChange={handleInputChange} required className="!bg-[#1E1E1E] border-zinc-700 mt-2 h-14 rounded-[20px]" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required className="!bg-[#1E1E1E] border-zinc-700 mt-2 h-14 rounded-[20px]" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="!bg-[#1E1E1E] border-zinc-700 mt-2 h-14 rounded-[20px]" />
                  </div>
                  <div>
                    <Label htmlFor="companyName" className="text-white">Company</Label>
                    <Input id="companyName" value={formData.companyName} onChange={handleInputChange} required className="!bg-[#1E1E1E] border-zinc-700 mt-2 h-14 rounded-[20px]" />
                  </div>
                  <div>
                    <Label htmlFor="sector" className="text-white">Sector</Label>
                    <Input id="sector" value={formData.sector} onChange={handleInputChange} required className="!bg-[#1E1E1E] border-zinc-700 mt-2 h-14 rounded-[20px]" />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-white">Create a Password</Label>
                    <Input id="password" type="password" value={formData.password} onChange={handleInputChange} required className="!bg-[#1E1E1E] border-zinc-700 mt-2 h-14 rounded-[20px]" />
                  </div>
                </div>
                <div className="pt-6 flex items-center justify-center">
                  <Button type="submit" variant="outline" className="w-75 h-14 text-lg !border-primary text-white hover:bg-primary/10 hover:text-primary rounded-[20px] flex items-center justify-center">
                    <Rocket className="mr-2 h-5 w-5" />
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full max-w-md flex flex-col justify-center h-full">
              <WalletConnectModal />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}