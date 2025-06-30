"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { HiredAgent } from "@/types"; // Usar o tipo para um agente contratado
import { KeyRound, Server, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HiredAgentListProps {
  contracts: HiredAgent[];
}

export default function HiredAgentList({ contracts }: HiredAgentListProps) {
  if (contracts.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-zinc-800 rounded-lg">
        <p className="text-neutral-400">You haven't hired any agents yet.</p>
      </div>
    );
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API Key copied to clipboard!");
  }
  
  return (
    <div className="space-y-4">
      {/* Cabeçalho da Tabela para telas maiores */}
      <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-2 text-neutral-400 text-sm font-semibold">
        <div className="col-span-2">Name</div>
        <div>Costs</div>
        <div>Queries</div>
        <div className="text-right">Actions</div>
      </div>

      {/* Lista de Cards */}
      <div className="space-y-4">
        {contracts.map(contract => (
          <div key={contract.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center bg-zinc-900 border border-zinc-800 p-4 rounded-lg text-white">
            <div className="col-span-2 font-medium flex flex-col">
              <span>{contract.agentName}</span>
              <span className="text-xs text-neutral-400">by {contract.creatorName}</span>
            </div>
            <div className="md:text-left"><span className="md:hidden font-semibold">Costs: </span>${contract.cost}</div>
            <div className="md:text-left"><span className="md:hidden font-semibold">Queries: </span>{contract.queries}</div>
            <div className="col-span-1 flex justify-end gap-2">
              <Button size="sm" variant="secondary" className="bg-zinc-700 hover:bg-zinc-600 rounded-md">Details</Button>
              <Button size="sm" variant="secondary" className="bg-primary hover:bg-primary/90 rounded-md" onClick={() => copyToClipboard(contract.apiKey)}>Key</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}