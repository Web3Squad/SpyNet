// This page is a Server Component, ideal for fetching data

import AgentCard from "@/components/features/marketplace/AgentCard";
import { SearchBar } from "@/components/features/marketplace/SearchBar";
import { Button } from "@/components/ui/button";
import { getAllAgents } from "@/lib/api"; // <-- Imports from our API

const FilterButton = ({ label, count }: { label: string; count: number }) => (
    <button className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
        <span>{label}</span>
        <span className="bg-zinc-700 text-white text-xs font-bold px-2 py-1 rounded">{count}</span>
    </button>
);

export default async function MarketplacePage() {
    // Fetches data from the API when the page is rendered on the server
    const agents = await getAllAgents();

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-24">
            <section className="text-center py-16 px-6 space-y-6 bg-[#1E1E1E] rounded-[25px]">
                <h1 className="text-5xl font-bold text-white leading-tight">Find the Perfect AI Agent!</h1>
                <p className="text-lg text-neutral-400">Type your need below...</p>
                <div className="pt-4"><SearchBar /></div>
            </section>

            <section className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Explore the Agents</h2>
                        <p className="text-lg text-neutral-400 mt-2">Find your New Collaborator!</p>
                    </div>
                    {/* Filters can be implemented in the future */}
                </div>
                
                {agents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {agents.map((agent) => (
                            <AgentCard
                                key={agent.id}
                                id={agent.id}
                                name={agent.name}
                                description={agent.description}
                                imageUrl={agent.imageUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-neutral-400">
                        <p>No agents found or failed to load.</p>
                    </div>
                )}
            </section>
        </div>
    );
}