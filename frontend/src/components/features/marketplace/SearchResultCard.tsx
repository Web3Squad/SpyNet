import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, BrainCircuit } from 'lucide-react';
import AgentCard from './AgentCard';
import type { AISearchResult } from '@/types';

interface SearchResultCardProps {
  result: AISearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    // Usamos a borda e o fundo gradiente do Design 2
    <div className="border border-primary/30 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 md:p-8 space-y-8 animate-in fade-in-50">
      
      {/* 1. Mantemos o cabeçalho sofisticado */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>AI Recommendation</span>
        </div>
        <h2 className="text-3xl font-bold text-white">We found the perfect agent for you!</h2>
      </div>

      {/* 2. Adotamos o layout de fluxo único do Design 1 */}
      <div className="space-y-8">
        
        {/* Justificativa da IA vem primeiro */}
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex items-center gap-3">
             <BrainCircuit className="h-5 w-5 text-neutral-400" />
             <h3 className="text-lg font-semibold text-white">AI's Reasoning</h3>
          </div>
          <blockquote className="border-l-2 border-primary/50 pl-4">
            <p className="text-lg text-neutral-300 italic">
              "{result.reasoning}"
            </p>
          </blockquote>
        </div>

        {/* O Card do Agente Recomendado vem logo abaixo, como o foco principal */}
        <div className="w-full max-w-sm mx-auto pt-4">
          <AgentCard 
            id={result.recommendedAgent.id}
            name={result.recommendedAgent.name}
            description={result.recommendedAgent.description}
            imageUrl={result.recommendedAgent.imageUrl}
          />
        </div>
      </div>

      {/* Rodapé com ação para ver todos os agentes */}
      <div className="text-center pt-4">
        <Button asChild variant="ghost" className="text-neutral-400 hover:text-white">
            <Link href="/marketplace">Not what you were looking for? View all agents</Link>
        </Button>
      </div>
    </div>
  );
}