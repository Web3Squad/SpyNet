"use client";

import { useEffect, useState } from "react";
import HiredAgentList from "@/components/features/dashboard/HiredAgentList";
import StatCard from "@/components/features/dashboard/StatCard";
import { useAuth } from "@/providers/AuthProvider";
import { getUserContracts } from "@/services/contractService"; // Importar a função
import type { ContractWithDetails } from "@/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompanyDashboardPage() {
  const { token } = useAuth();
  const [contracts, setContracts] = useState<ContractWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchContracts = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getUserContracts(token);
        setContracts(data);
      } catch (error) {
        console.error("Falha ao buscar contratos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContracts();
  }, [token]);

  // Calcular estatísticas com base nos contratos
  const totalQueries = contracts.reduce((acc, c) => acc + (c.callsPurchased - c.callsRemaining), 0);
  const totalSpent = contracts.length * 0; // Precisa do preço do agente para calcular
  const agentsHired = contracts.length;

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin"/></div>
  }

  return (
    <div className="space-y-16">
      <section className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Seus Agentes Contratados</h1>
          <p className="text-lg text-neutral-400 mt-2">Gerencie e monitore o uso dos seus agentes.</p>
        </div>
        <HiredAgentList contracts={contracts} />
         <div className="text-center pt-6">
            <Button asChild variant="outline" className="!border-primary text-white text-lg hover:bg-primary/10 hover:text-primary rounded-lg px-8 py-5">
                <Link href="/marketplace">Contratar Mais Agentes</Link>
            </Button>
        </div>
      </section>

      <section className="space-y-8">
         <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Visão Geral de Custos e Uso</h2>
             <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg">
              <span className="text-neutral-400">Agentes Ativos</span>
              <span className="bg-zinc-700 text-white text-sm font-bold px-2 py-1 rounded">{agentsHired}</span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard title="Custos Acumulados" amount={`$${totalSpent.toFixed(2)}`} />
            <StatCard title="Total de Chamadas" amount={totalQueries.toString()} />
            <StatCard title="Saldo Disponível" amount="N/A" />
        </div>
      </section>
    </div>
  );
}