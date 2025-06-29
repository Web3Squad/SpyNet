// src/components/features/dashboard/AgentList.tsx
import { Button } from '@/components/ui/button';
import React from 'react';

// Dados fictícios para a lista de agentes
const agents = [
  { name: 'Agente de Análise de Crédito', specialty: 'Finanças', status: 'Ativo', score: 4.8 },
  { name: 'Assistente de Viagens IA', specialty: 'Turismo', status: 'Ativo', score: 4.9 },
  { name: 'Consultor Jurídico Automatizado', specialty: 'Direito', status: 'Inativo', score: 4.5 },
  { name: 'Personal Trainer Virtual', specialty: 'Saúde', status: 'Ativo', score: 4.7 },
];

const AgentList = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      {/* Cabeçalho da Tabela */}
      <div className="grid grid-cols-6 gap-4 px-4 py-2 text-neutral-400 text-sm font-semibold">
        <div className="col-span-2">Nome</div>
        <div>Especialidade</div>
        <div>Status</div>
        <div>Score</div>
        <div className="col-span-1"></div> {/* Espaço para os botões */}
      </div>

      {/* Linhas da Tabela */}
      <div className="space-y-4 mt-4">
        {agents.map((agent, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 items-center bg-zinc-800/50 p-4 rounded-lg text-white">
            <div className="col-span-2 font-medium">{agent.name}</div>
            <div>{agent.specialty}</div>
            <div>
              <span className={`px-2 py-1 text-xs rounded-full ${agent.status === 'Ativo' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {agent.status}
              </span>
            </div>
            <div>{agent.score}</div>
            <div className="col-span-1 flex justify-end gap-2">
              <Button size="sm" variant="secondary" className="bg-zinc-700 hover:bg-zinc-600 rounded-md">Detalhes</Button>
              <Button size="sm" variant="secondary" className="bg-zinc-700 hover:bg-zinc-600 rounded-md">Editar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentList;