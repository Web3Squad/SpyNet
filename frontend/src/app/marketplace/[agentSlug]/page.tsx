// src/app/marketplace/[agentSlug]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { mockAgents } from "@/lib/mockAgentData";
import { notFound } from 'next/navigation';

// Tipos para os dados do agente
type AgentData = (typeof mockAgents)[0];

// --- Componentes de UI (Pequenos e Reutilizáveis) ---
const DetailSection = ({ title, details }: { title: string; details: { label: string; value: string }[] }) => (
    <section className="space-y-6">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
            {details.map((detail) => (
                <div key={detail.label} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <span className="text-neutral-400 font-semibold uppercase col-span-1">{detail.label}</span>
                    <p className="text-white md:col-span-2">{detail.value}</p>
                </div>
            ))}
        </div>
    </section>
);

const UseCaseCard = ({ title, description }: { title: string; description: string; }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-neutral-400">{description}</p>
    </div>
);

// --- Componente de Página (Lógica + UI) ---
export default function AgentDetailPage({ params }: { params: { agentSlug: string } }) {
    // Busca de dados acontece aqui
    const agentData = mockAgents.find(agent => agent.slug === params.agentSlug);

    // Se o agente não for encontrado, renderiza a página 404 do Next.js
    if (!agentData) {
        notFound();
    }

    // Se encontrou, renderiza a página com os dados
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-16">
            <header className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-zinc-800 rounded-lg flex-shrink-0">
                    {agentData.imageUrl && <img src={agentData.imageUrl} alt={agentData.name} className="w-full h-full object-cover rounded-lg" />}
                </div>
                <div className="space-y-4 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-white">{agentData.name}</h1>
                    <p className="text-neutral-400">{agentData.description}</p>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6">
                        <Link href={`/marketplace/${agentData.slug}/hire`}>Contratar</Link>
                    </Button>
                </div>
            </header>

            <main className="space-y-16">
                {agentData.overview && agentData.overview.length > 0 && <DetailSection title="Visão Geral" details={agentData.overview} />}
                {agentData.useCases && agentData.useCases.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Casos de Uso</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {agentData.useCases.map(useCase => (
                                <UseCaseCard key={useCase.title} title={useCase.title} description={useCase.description} />
                            ))}
                        </div>
                    </section>
                )}
                {agentData.performance && agentData.performance.length > 0 && <DetailSection title="Desempenho" details={agentData.performance} />}
            </main>

            <footer className="text-center pt-8">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-10 py-6 text-lg">
                    <Link href={`/marketplace/${agentData.slug}/hire`}>Contratar Agora</Link>
                </Button>
            </footer>
        </div>
    );
}