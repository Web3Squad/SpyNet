"use client";

import { Button } from '@/components/ui/button';
import type { MyAgent } from '@/types'; // Usar o tipo para 'meus agentes'

interface AgentListProps {
  agents: MyAgent[];
}

export default function AgentList({ agents }: AgentListProps) {
  if (agents.length === 0) {
     return (
      <div className="text-center py-10 border-2 border-dashed border-zinc-800 rounded-lg">
        <p className="text-neutral-400">You haven't created any agents yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-2 text-neutral-400 text-sm font-semibold">
        <div className="col-span-2">Name</div>
        <div>Specialty</div>
        <div>Status</div>
        <div className="text-right">Actions</div>
      </div>

      <div className="space-y-4 mt-4">
        {agents.map((agent) => (
          <div key={agent.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center bg-zinc-800/50 p-4 rounded-lg text-white">
            <div className="col-span-2 font-medium">{agent.name}</div>
            <div>{agent.specialty}</div>
            <div>
              <span className={`px-2 py-1 text-xs rounded-full ${agent.status === 'Ativo' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {agent.status}
              </span>
            </div>
            <div className="col-span-1 flex justify-end gap-2">
              <Button size="sm" variant="secondary" className="bg-zinc-700 hover:bg-zinc-600 rounded-md">Details</Button>
              <Button size="sm" variant="secondary" className="bg-zinc-700 hover:bg-zinc-600 rounded-md">Edit</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};