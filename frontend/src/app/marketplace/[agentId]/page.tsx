import { getAgentById } from "@/lib/api";
import { notFound } from "next/navigation";
import { HireButton } from "@/components/features/marketplace/HireButton"; 
import type { Metadata } from 'next';

const DetailSection = ({ title, details }: { title: string; details: { label: string; value: string | undefined }[] }) => (
    <section className="space-y-6">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
            {details.map((detail) => (
                <div key={detail.label} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <span className="text-neutral-400 font-semibold uppercase col-span-1">{detail.label}</span>
                    <p className="text-white md:col-span-2">{detail.value ?? 'N/A'}</p>
                </div>
            ))}
        </div>
    </section>
);

// Solução 1: Cast direto na função
// export default async function AgentDetailPage({ params }: any) { 
//     const agent = await getAgentById(params.agentId as string); // Cast agentId também para string, por segurança

// Solução 2: Definir a interface com 'any' para o params, se precisar de mais granularidade (um pouco menos "radical")
interface AgentDetailPagePropsHacky {
    params: any; // Isso torna 'params' de qualquer tipo
}

export default async function AgentDetailPage({ params }: AgentDetailPagePropsHacky) {
    // Agora 'params' é 'any', então você pode acessar suas propriedades diretamente.
    // Para maior segurança (mesmo dentro de 'any'), você pode fazer um cast específico para agentId
    const agent = await getAgentById(params.agentId); 

    if (!agent) {
        notFound();
    }

    const overviewDetails = [
      { label: "CREATOR", value: agent.creator?.name ?? 'Creator not informed' },
      { label: "SPECIALTY", value: agent.specialty },
      { label: "DESCRIPTION", value: agent.description },
      { label: "PRICE PER CALL", value: `$${agent.pricePerCall}` }
    ];

    const useCasesList = agent.useCases?.split(',').map(uc => uc.trim()) ?? [];

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-16">
            <header className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-zinc-800 rounded-lg flex-shrink-0">
                    {agent.imageUrl && <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover rounded-lg" />}
                </div>
                <div className="space-y-4 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-white">{agent.name}</h1>
                    <p className="text-neutral-400">{agent.description}</p>
                    
                    <HireButton agentId={agent.id} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6" />

                </div>
            </header>

            <main className="space-y-16">
                <DetailSection title="Overview" details={overviewDetails} />
                
                {useCasesList.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Use Cases</h2>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4">
                            <ul className="list-disc list-inside text-white">
                                {useCasesList.map((useCase, index) => (
                                    <li key={index}>{useCase}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </main>

            <footer className="text-center pt-8">
                <HireButton 
                  agentId={agent.id} 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-10 py-6 text-lg"
                />
            </footer>
        </div>
    );
}