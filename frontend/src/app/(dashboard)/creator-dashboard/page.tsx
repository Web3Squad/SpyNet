"use client";

import { useState } from "react"; 
import { useAuth } from "@/providers/AuthProvider";
import StatCard from "@/components/features/dashboard/StatCard";
import AgentList from "@/components/features/dashboard/AgentList";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function CreatorDashboardPage() {
  const { user } = useAuth();
  


  const handleCreateAgent = () => {
    console.log("Lógica para criar o agente seria executada aqui.");
  }

  return (
    <div className="space-y-12">
      {/* Seção do Cabeçalho */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Agent Control</h1>
        <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg">
          <span className="text-neutral-400">Agent</span>
          <span className="bg-zinc-700 text-white text-sm font-bold px-2 py-1 rounded">3</span>
        </div>
      </div>

      {/* Seção de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard title="Accumulated Revenue" />
        <StatCard title="Number of Queries" />
        <StatCard title="Average Score" />
      </div>

      {/* Seção da Lista de Agentes */}
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">My Agents</h2>
            
            {/* 4. Envolver o botão com a estrutura do Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="!border-primary text-white text-xl hover:bg-primary/10 hover:text-primary rounded-lg px-10 py-5">
                  Create Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Agent</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new AI agent.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="agent-name" className="text-right text-neutral-300">
                      Name
                    </Label>
                    <Input id="agent-name" placeholder="E.g., Financial Analyst" className="col-span-3 bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="agent-specialty" className="text-right text-neutral-300">
                      Specialty
                    </Label>
                    <Input id="agent-specialty" placeholder="E.g., Finance" className="col-span-3 bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary" className="bg-zinc-700 hover:bg-zinc-600">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="button" onClick={handleCreateAgent} className="bg-primary hover:bg-primary/90">
                    Save Agent
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

        </div>
        <AgentList />
      </div>
    </div>
  );
}