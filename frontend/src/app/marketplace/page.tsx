import AgentCard from "@/components/features/marketplace/AgentCard";
import { SearchBar } from "@/components/features/marketplace/SearchBar";
import { getAllAgents, findBestAgent } from "@/lib/api";
import { SearchResultCard } from "@/components/features/marketplace/SearchResultCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";


interface Agent {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
}

interface SearchResult {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    score: number;
}

// A mudança "radical" está aqui: defina as props como 'any'
export default async function MarketplacePage(props: any) { // <-- MUDANÇA AQUI
    // Acesse searchParams através de props.searchParams
    const query = props.searchParams?.query; 

    let agents: Agent[] = [];
    let searchResult = null;

    if (query) {
        searchResult = await findBestAgent(query);
    } else {
        agents = (await getAllAgents()).map(agent => ({
            ...agent,
            imageUrl: agent.imageUrl ?? ""
        }));
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-24">
            <section className="text-center py-16 px-6 bg-[#1E1E1E] rounded-[25px]">
                <h1 className="text-5xl font-bold text-white leading-tight">Find the Perfect AI Agent!</h1>
                <p className="text-lg text-neutral-400">Describe your need and let our AI find the best agent for you.</p>
                <div className="pt-4"><SearchBar /></div>
            </section>

            <section className="space-y-10">
                {/* Conditional rendering */}
                {searchResult ? (
                    // If there is a search result, show the special card
                    <SearchResultCard result={searchResult} />
                ) : (
                    // Otherwise, show the full list of agents
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h2 className="text-4xl font-bold text-white">Explore the Agents</h2>
                                <p className="text-lg text-neutral-400 mt-2">Find your New Collaborator!</p>
                            </div>
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
                    </>
                )}
            </section>
        </div>
    );
}