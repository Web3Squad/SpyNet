"use client";

import { useEffect, useState } from "react";
import HiredAgentList from "@/components/features/dashboard/HiredAgentList";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/providers/AuthProvider";
import { getBuyerDashboardData } from "@/services/dashboardService";
import type { BuyerDashboardData } from "@/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BalanceStatCard } from "@/components/features/dashboard/BalanceStatCard"; // 1. Importar o novo componente

export default function CompanyDashboardPage() {
  const { token } = useAuth();
  const [dashboardData, setDashboardData] = useState<BuyerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getBuyerDashboardData(token);
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [token]);


  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin"/></div>
  }

  if (!dashboardData) {
    return <div className="text-center text-neutral-400">Could not load dashboard data.</div>
  }

  return (
    <div className="space-y-16">
      {/* Esta seção permanece igual */}
      <section className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Your Hired Agents</h1>
          <p className="text-lg text-neutral-400 mt-2">Manage and monitor your agents' usage.</p>
        </div>
        <HiredAgentList contracts={dashboardData.hiredAgents} />
         <div className="text-center pt-6">
            <Button asChild variant="outline" className="!border-primary text-white text-lg hover:bg-primary/10 hover:text-primary rounded-lg px-8 py-5">
                <Link href="/marketplace">Hire More Agents</Link>
            </Button>
        </div>
      </section>

      <section className="space-y-8">
         <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Cost & Usage Overview</h2>
             <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg">
              <span className="text-neutral-400">Active Agents</span>
              <span className="bg-zinc-700 text-white text-sm font-bold px-2 py-1 rounded">{dashboardData.hiredAgents.length}</span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 2. Ajustamos os StatCards para usar 'children' e passamos o novo componente */}
            <StatCard title="Accumulated Costs">
              <p className="text-4xl font-bold text-white">${dashboardData.summary.accumulatedCosts}</p>
            </StatCard>
            <StatCard title="Total Queries">
              <p className="text-4xl font-bold text-white">{dashboardData.summary.totalQueries}</p>
            </StatCard>
            
            {/* 3. O antigo StatCard de saldo é substituído pelo novo componente inteligente */}
            <BalanceStatCard />
        </div>
      </section>
    </div>
  );
}