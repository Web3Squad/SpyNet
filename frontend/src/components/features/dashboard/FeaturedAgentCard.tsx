// src/components/features/dashboard/FeaturedAgentCard.tsx
import { Circle } from 'lucide-react';
import React from 'react';

// 1. Adicionamos a propriedade opcional 'imageUrl'
type FeaturedAgentCardProps = {
  agentName: string;
  creatorName: string;
  imageUrl?: string; // A URL da imagem é opcional
};

const FeaturedAgentCard = ({ agentName, creatorName, imageUrl }: FeaturedAgentCardProps) => {
  return (
    // 2. O container principal agora é 'relative' para posicionar a imagem e o overlay
    <div className="relative border border-zinc-700/50 rounded-2xl aspect-square cursor-pointer hover:border-primary transition-colors overflow-hidden group">
      
      {/* 3. Renderização condicional do fundo */}
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={agentName} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      ) : (
        <div className="absolute inset-0 bg-[#C4C4C4]"></div>
      )}

      {/* 4. Overlay de gradiente para garantir a legibilidade do texto sobre a imagem */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* 5. O conteúdo do card fica em um container 'relative' para ficar acima do fundo e do overlay */}
      <div className="relative p-6 h-full flex flex-col justify-end">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">{agentName}</h3>
          <div className="flex items-center gap-2">
            <Circle size={8} className="text-neutral-400 fill-current" />
            <p className="text-sm text-neutral-400">{creatorName}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FeaturedAgentCard;