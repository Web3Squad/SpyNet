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

// UPDATED: Type for form data with new fields
type FormData = {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  sector: string; // New field "Sector"
  password: string;
  role: 'creator' | 'company';
};

// Main component of the page
export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const { address, isConnected } = useAccount();

  const [step, setStep] = useState(1);

  // UPDATED: Initial state with new fields
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    sector: '', // New field "Sector"
    password: '',
    role: 'creator',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  useEffect(() => {
    if (step === 2 && isConnected && address) {
      console.log("Wallet connected, registering user with data:", formData);
      // ATTENTION: Remember to send the new fields to your register function
      register({
        name: formData.name,
        email: formData.email,
        senha: formData.password,
        address: address,
        role: formData.role,
        company: formData.companyName,
        sector: formData.sector,
        phone: formData.phone,
      });
      // router.push('/login?registered=true');
    }
  }, [step, isConnected, address, register, formData, router]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 lg:gap-24 items-stretch">
        {/* Left Column (Image) */}
        <div className="hidden lg:flex justify-center items-stretch">
          <div className="w-full h-[700px] bg-[#C4C4C4] rounded-2xl"></div>
        </div>

        {/* Right Column (Dynamic Content) */}
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
                {/* UPDATED: Tabs for profile selection with active style */}
                <Tabs value={formData.role} onValueChange={(value) => setFormData(p => ({ ...p, role: value as 'creator' | 'company' }))}>
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-800 h-12 rounded-full inline-flex">
                    <TabsTrigger value="creator" className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full">
                      Creator
                    </TabsTrigger>
                    <TabsTrigger value="company" className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full">
                      Company
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {/* UPDATED: Fixed list of inputs */}
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
            
            <WalletConnectModal onClose={() => setStep(1)} />
          )}
        </div>
      </div>
    </div>
  );
}