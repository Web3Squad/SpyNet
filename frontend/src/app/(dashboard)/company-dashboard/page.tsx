// src/app/(dashboard)/company-dashboard/page.tsx
"use client";

import StatCard from "@/components/features/dashboard/StatCard";
import FeaturedAgentCard from "@/components/features/dashboard/FeaturedAgentCard";
import HiredAgentList from "@/components/features/dashboard/HiredAgentList";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function CompanyDashboardPage() {
  return (
    <div className="space-y-16">
      {/* Section 1: Find Agents */}
      <section className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Find Agents</h1>
          <p className="text-lg text-neutral-400 mt-2">Find Your New Collaborator!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeaturedAgentCard
            agentName="Legal Agent"
            creatorName="NW Associated Lawyers"
            imageUrl="/img/dashboard/image.png" 
          />
          <FeaturedAgentCard
            agentName="Marketing Agent"
            creatorName="RJ Solutions"
            imageUrl="img/dashboard/image.png" 
          />
          <FeaturedAgentCard
            agentName="Developer Agent"
            creatorName="Prisma Software"
            imageUrl="img/dashboard/image.png" 
          />
        </div>
        <div className="text-center">
            {/* Mantive as classes do seu botão atualizadas */}
            <Button variant="outline" className="!border-primary text-white text-2xl hover:bg-primary/10 hover:text-primary rounded-lg px-15 py-5 ">
                <Star className="mr-2 h-4 w-4" />
                Find Agents
            </Button>
        </div>
      </section>

      {/* Section 2: Cost Overview */}
      <section className="space-y-8">
         <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Cost Overview</h2>
            <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg">
              <span className="text-neutral-400">Agent</span>
              <span className="bg-zinc-700 text-white text-sm font-bold px-2 py-1 rounded">3</span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard title="Accumulated Costs" />
            <StatCard title="Number of Queries" />
            <StatCard title="Available Balance" />
        </div>
      </section>

      {/* Section 3: Hired Agents */}
      <section className="space-y-8">
         <h2 className="text-3xl font-bold text-white">Hired Agents</h2>
         <HiredAgentList />
      </section>
    </div>
  );
}