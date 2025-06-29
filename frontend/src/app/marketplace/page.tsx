"use client";

import AgentCard from "@/components/features/marketplace/AgentCard";
import { SearchBar } from "@/components/features/marketplace/SearchBar";
import { Button } from "@/components/ui/button";
import { mockAgents } from "@/lib/mockAgentData";
import React from "react";

const FilterButton = ({ label, count }: { label: string; count: number }) => (
    <button className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
        <span>{label}</span>
        <span className="bg-zinc-700 text-white text-xs font-bold px-2 py-1 rounded">{count}</span>
    </button>
);

export default function MarketplacePage() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-24">
            
            <section className="text-center py-16 px-6 space-y-6">
                <h1 className="text-5xl font-bold text-white leading-tight">Encontre o Agente de IA Perfeito para você!</h1>
                <p className="text-lg text-neutral-400">Digite abaixo sua necessidade...</p>
                <div className="pt-4"><SearchBar /></div>
            </section>

            <section className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Explore Os Agentes</h2>
                        <p className="text-lg text-neutral-400 mt-2">Encontre o Seu Novo Colaborador!</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <FilterButton label="Categoria" count={302} />
                        <FilterButton label="Preço" count={302} />
                        <FilterButton label="Score" count={302} />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {mockAgents.map((agent) => (
                        <AgentCard
                            key={agent.slug}
                            slug={agent.slug}
                            name={agent.name}
                            description={agent.description}
                            imageUrl={agent.imageUrl}
                        />
                    ))}
                </div>

                <div className="text-center pt-8">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-base">Veja Mais</Button>
                </div>
            </section>
        </div>
    );
}