"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Rocket } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components

// Mock data for the agent display
// In your real application, you would receive this via props or a data hook.
const selectedAgent = {
  name: "Digital Marketing Agent",
  price: "$0.03 per query",
  billing: "On-chain (MATIC)",
};

type LimitType = "unlimited" | "limited";

export default function HireAgentPage() {
  const [limitType, setLimitType] = useState<LimitType>("limited");
  const [maxQueries, setMaxQueries] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }
    const submissionData = {
      agent: selectedAgent,
      limitType,
      maxQueries: limitType === "limited" ? maxQueries : "unlimited",
      agreedToTerms,
    };
    console.log("Hiring Data:", submissionData);
    // Here you would implement the hiring and on-chain payment logic
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="text">
          <h1 className="text-4xl font-bold text-white">Hire Agent</h1>
          <p className="mt-2 text-lg text-gray-400">Finalize the hiring process for your agent...</p>
        </div>

        {/* Increased top margin and spacing between items */}
        <div className="mt-16 space-y-12">
          {/* Selected Agent Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Selected Agent</h2>
            <div className="space-y-4 rounded-lg bg-[#1E1E1E] p-6 border border-zinc-700">
              <div className="flex justify-between">
                <span className="font-mono text-sm text-gray-400">NAME</span>
                <span className="text-white">{selectedAgent.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm text-gray-400">PRICE</span>
                <span className="text-white">{selectedAgent.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm text-gray-400">BILLING</span>
                <span className="text-white">{selectedAgent.billing}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Query Limit Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Query Limit</h2>
              <p className="text-gray-400">How do you intend to use the Agent?</p>
              
              {/* --- DESIGN ATUALIZADO (TABS) --- */}
              <Tabs value={limitType} onValueChange={(value) => setLimitType(value as LimitType)}>
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-800 h-12 rounded-full">
                    <TabsTrigger value="unlimited" className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full">
                      Unlimited
                    </TabsTrigger>
                    <TabsTrigger value="limited" className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full">
                      Limited
                    </TabsTrigger>
                  </TabsList>
              </Tabs>

              {limitType === "limited" && (
                <div className="space-y-2 pt-4 animate-in fade-in">
                  <Label htmlFor="max-queries" className="text-gray-300">
                    Enter the maximum number of queries:
                  </Label>
                  <Input
                    id="max-queries"
                    type="number"
                    value={maxQueries}
                    onChange={(e) => setMaxQueries(e.target.value)}
                    className="!bg-[#1E1E1E] border-zinc-700 text-white h-14 text-base rounded-[20px] focus:border-primary focus:ring-primary"
                    placeholder="E.g., 1000"
                    min="1"
                    required
                  />
                </div>
              )}
            </div>

            {/* Terms of Use Section */}
            <div className="space-y-6">
               <h2 className="text-xl font-semibold text-white">Terms of Use</h2>
               <div className="flex items-center space-x-3">
                    <Checkbox 
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        className="h-5 w-5 rounded border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <Label
                        htmlFor="terms"
                        className="text-gray-300 cursor-pointer"
                    >
                        I have read and agree to the Terms and Conditions
                    </Label>
                </div>
            </div>

            {/* Final Section */}
            <div className="text-center space-y-8 pt-4">
                <p className="text-gray-400">
                    After hiring, you will receive a key ready for use!
                </p>
                 <div className="flex justify-center">
                    <Button
                        type="submit"
                        variant="outline"
                        className="w-full max-w-sm h-14 text-lg !border-primary text-white hover:bg-primary/10 hover:text-primary rounded-[20px] flex items-center justify-center font-semibold"
                        disabled={!agreedToTerms}
                    >
                        <Rocket className="mr-2 h-5 w-5" />
                        Hire Agent
                    </Button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}