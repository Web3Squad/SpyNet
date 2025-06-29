// src/components/features/dashboard/HiredAgentList.tsx
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from 'react';
import { AccessKeyModal } from './modals/AccessKeyModal';
import { ProofOfWorkModal } from './modals/ProofOfWorkModal';


// 1. Atualizamos os dados fictícios para incluir a API Key e o histórico
const hiredAgents = [
  { 
    name: 'Legal Analysis Agent', 
    creator: 'NW Lawyers', 
    costs: '$ 150.00', 
    queries: 75,
    apiKey: '0xC0E3A7...B79CDE83', // Chave fictícia
    workHistory: [
        { agentName: 'Legal Analysis Agent', date: '2025-06-28', duration: '1.2s', cost: '$2.00', result: 'Success' },
        { agentName: 'Legal Analysis Agent', date: '2025-06-27', duration: '1.5s', cost: '$2.00', result: 'Success' },
    ]
  },
  { 
    name: 'Marketing Copy Agent', 
    creator: 'RJ Solutions', 
    costs: '$ 275.00', 
    queries: 210,
    apiKey: '0xAB12CD...EFGH5678',
    workHistory: [
        { agentName: 'Marketing Copy Agent', date: '2025-06-28', duration: '0.8s', cost: '$1.31', result: 'Success' },
    ]
  },
];

const HiredAgentList = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-4 py-2 text-neutral-400 text-sm font-semibold">
        <div className="col-span-2">Name</div>
        <div>Creator</div>
        <div>Costs</div>
        <div>Queries</div>
        <div className="col-span-1"></div>
      </div>

      {/* Table Rows */}
      <div className="space-y-4 mt-4">
        {hiredAgents.map((agent) => (
          <div key={agent.name} className="grid grid-cols-6 gap-4 items-center bg-zinc-800/50 p-4 rounded-lg text-white">
            <div className="col-span-2 font-medium">{agent.name}</div>
            <div>{agent.creator}</div>
            <div>{agent.costs}</div>
            <div>{agent.queries}</div>
            <div className="col-span-1 flex justify-end gap-2">

              {/* 2. Botão "Detalhes" agora abre o modal ProofOfWorkModal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="secondary" className="bg-zinc-700 hover:bg-zinc-600 rounded-md">Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-zinc-900 border-zinc-800 text-white">
                  <ProofOfWorkModal proofs={agent.workHistory} />
                </DialogContent>
              </Dialog>

              {/* 3. Botão "Chave" agora abre o modal AccessKeyModal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-md">Key</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
                    <AccessKeyModal apiKey={agent.apiKey} />
                </DialogContent>
              </Dialog>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiredAgentList;