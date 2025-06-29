"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket } from "lucide-react";
import { mockAgents } from "@/lib/mockAgentData";
import { notFound } from "next/navigation";

// Objeto para armazenar dados extraídos do agente para a UI
type AgentHiringDetails = {
    name: string;
    price: string;
    billing: string; // Adicionamos um valor padrão
};

export default function HireAgentPage({ params }: { params: { agentSlug: string } }) {
  // 1. Busca o agente completo usando o slug da URL, assim como na página de detalhes.
  const agentData = mockAgents.find(
    (agent) => agent.slug === params.agentSlug
  );

  // 2. Se nenhum agente for encontrado, redireciona para a página 404.
  if (!agentData) {
    notFound();
  }

  // 3. Extrai os detalhes necessários do agente encontrado.
  // Procura pelo preço no array 'overview' e define valores padrão se não encontrar.
  const selectedAgent: AgentHiringDetails = {
    name: agentData.name,
    price: agentData.overview.find(d => d.label === "PREÇO")?.value || "Sob consulta",
    billing: "On-chain (MATIC)", // Você pode adicionar isso aos seus dados mock se variar
  };

  const [limitType, setLimitType] = useState<"unlimited" | "limited">("limited");
  const [maxQueries, setMaxQueries] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Você deve concordar com os Termos e Condições.");
      return;
    }
    const submissionData = {
      agent: selectedAgent,
      limitType,
      maxQueries: limitType === "limited" ? maxQueries : "unlimited",
      agreedToTerms,
    };
    console.log("Hiring Data:", submissionData);
    // Futura lógica de contratação e pagamento on-chain aqui
    alert(`Agente ${selectedAgent.name} contratado com sucesso!`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Contratar Agente</h1>
          <p className="mt-2 text-lg text-gray-400">Finalize o processo de contratação para seu agente...</p>
        </div>

        <div className="mt-16 space-y-12">
          {/* Seção do Agente Selecionado */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Agente Selecionado</h2>
            <div className="space-y-4 rounded-lg bg-[#1E1E1E] p-6 border border-zinc-700">
              <div className="flex justify-between">
                <span className="font-mono text-sm text-gray-400">NOME</span>
                <span className="text-white">{selectedAgent.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm text-gray-400">PREÇO</span>
                <span className="text-white">{selectedAgent.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm text-gray-400">FATURAMENTO</span>
                <span className="text-white">{selectedAgent.billing}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Limite de Consultas */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Limite de Consultas</h2>
              <p className="text-gray-400">Como você pretende usar o Agente?</p>
              <Tabs value={limitType} onValueChange={(value) => setLimitType(value as "unlimited" | "limited")}>
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-800 h-12 rounded-full">
                    <TabsTrigger value="unlimited" className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full">Ilimitado</TabsTrigger>
                    <TabsTrigger value="limited" className="text-base data-[state=active]:!bg-primary data-[state=active]:text-primary-foreground rounded-full">Limitado</TabsTrigger>
                  </TabsList>
              </Tabs>
              {limitType === "limited" && (
                <div className="space-y-2 pt-4 animate-in fade-in">
                  <Label htmlFor="max-queries" className="text-gray-300">Digite o número máximo de consultas:</Label>
                  <Input id="max-queries" type="number" value={maxQueries} onChange={(e) => setMaxQueries(e.target.value)} className="!bg-[#1E1E1E] border-zinc-700 text-white h-14 text-base rounded-[20px] focus:border-primary focus:ring-primary" placeholder="Ex: 1000" min="1" required />
                </div>
              )}
            </div>

            {/* Termos de Uso */}
            <div className="space-y-6">
               <h2 className="text-xl font-semibold text-white">Termos de Uso</h2>
               <div className="flex items-center space-x-3">
                    <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} className="h-5 w-5 rounded border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                    <Label htmlFor="terms" className="text-gray-300 cursor-pointer">Eu li e concordo com os Termos e Condições</Label>
                </div>
            </div>

            {/* Botão de Contratação */}
            <div className="text-center space-y-8 pt-4">
                <p className="text-gray-400">Após a contratação, você receberá uma chave pronta para uso!</p>
                 <div className="flex justify-center">
                    <Button type="submit" variant="outline" className="w-full max-w-sm h-14 text-lg !border-primary text-white hover:bg-primary/10 hover:text-primary rounded-[20px] flex items-center justify-center font-semibold" disabled={!agreedToTerms}>
                        <Rocket className="mr-2 h-5 w-5" />
                        Contratar Agente
                    </Button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}