"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { ContractWithDetails } from "@/types"; // Usaremos um tipo mais detalhado
import { KeyRound, Server, Zap } from "lucide-react";

interface HiredAgentListProps {
  contracts: ContractWithDetails[];
}

export default function HiredAgentList({ contracts }: HiredAgentListProps) {
  if (contracts.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-zinc-800 rounded-lg">
        <p className="text-neutral-400">Você ainda não contratou nenhum agente.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contracts.map(contract => (
        <Card key={contract.id} className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <img src={contract.Agent.imageUrl ?? '/img/agents/default.png'} alt={contract.Agent.name} className="w-10 h-10 rounded-full object-cover" />
              {contract.Agent.name}
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Contratado em {new Date(contract.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-primary" />
              <span className="text-neutral-300">API Key:</span>
              <span className="font-mono bg-zinc-800 px-2 py-1 rounded truncate">
                {contract.apiKey?.key ?? 'Chave não encontrada'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-neutral-300">Chamadas Restantes:</span>
              <span className="font-semibold">
                {contract.callsRemaining === -1 ? 'Ilimitado' : contract.callsRemaining}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <span className="text-neutral-300">Endpoint:</span>
              <span className="font-mono truncate">{contract.Agent.endpoint}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}