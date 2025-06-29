"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket } from "lucide-react";
import { notFound } from "next/navigation";
import { getAgentById } from "@/lib/api";
import { Agent } from "@/types";

export default function HireAgentPage({ params }: { params: { agentId: string } }) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  const [limitType, setLimitType] = useState<"unlimited" | "limited">("limited");
  const [maxQueries, setMaxQueries] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const fetchAgent = async () => {
      setLoading(true);
      const agentData = await getAgentById(params.agentId);
      if (!agentData) {
        notFound();
      }
      setAgent(agentData);
      setLoading(false);
    };

    fetchAgent();
  }, [params.agentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }
    const submissionData = {
      agentId: agent?.id,
      limitType,
      maxQueries: limitType === "limited" ? maxQueries : "unlimited",
    };
    console.log("Hiring Data:", submissionData);
    alert(`Agent ${agent?.name} hired successfully!`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading agent...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-2xl flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold text-white">Hire Agent</h1>
          <p className="text-lg text-gray-400">
            Complete the process for: {agent?.name}
          </p>
        </div>
        <div className="flex flex-col gap-12">
          <div className="space-y-6 rounded-lg bg-[#1E1E1E] p-8 border border-zinc-700">
            <div className="flex justify-between items-center">
              <span className="font-mono text-sm text-gray-400">NAME</span>
              <span className="text-white">{agent?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-sm text-gray-400">PRICE</span>
              <span className="text-white">${agent?.pricePerCall} / call</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              <h2 className="text-xl font-semibold text-white">
                Call Limit
              </h2>
              <Tabs
                value={limitType}
                onValueChange={(value) =>
                  setLimitType(value as "unlimited" | "limited")
                }
              >
                <TabsList className="grid w-full grid-cols-2 bg-zinc-800 h-12 rounded-full">
                  <TabsTrigger
                    value="unlimited"
                    className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full"
                  >
                    Unlimited
                  </TabsTrigger>
                  <TabsTrigger
                    value="limited"
                    className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full"
                  >
                    Limited
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {limitType === "limited" && (
                <div className="flex flex-col gap-2 pt-4 animate-in fade-in">
                  <Label
                  htmlFor="max-queries"
                  className="text-base text-white font-medium"
                  >
                  Maximum number of calls:
                  </Label>
                  <Input
                  id="max-queries"
                  type="number"
                  min={1}
                  value={maxQueries}
                  onChange={(e) => setMaxQueries(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                  placeholder="Enter the number of calls"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 bg-zinc-800 rounded-lg px-4 py-3 border border-zinc-700">
              <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="data-[state=checked]:bg-primary border-zinc-600"
              />
              <Label htmlFor="terms" className="text-white text-base">
              I have read and agree to the <span className="underline cursor-pointer hover:text-primary transition-colors">Terms and Conditions</span>
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={!agreedToTerms || loading}
            >
              <Rocket className="mr-2 h-5 w-5" />
              Hire Agent
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}