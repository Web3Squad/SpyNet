import Link from 'next/link';
import React from 'react';
import { Wand2 } from 'lucide-react';

type AgentCardProps = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
};

const AgentCard = ({ id, name, description, imageUrl }: AgentCardProps) => {
  return (
    <Link href={`/marketplace/${id}`} className="flex flex-col space-y-4 group">
      <div className="w-full h-56 bg-zinc-800 rounded-2xl overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-neutral-500">
            <span>No Image</span>
          </div>
        )}
      </div>
      
      <div className="flex-grow flex flex-col space-y-2 px-2">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-neutral-400 text-sm flex-grow">{description}</p>
      </div>

      <div className="px-2 pb-2">
        <div className="w-full text-center border border-zinc-700 text-neutral-300 group-hover:text-white group-hover:border-primary transition-colors duration-300 rounded-lg py-2 flex items-center justify-center">
          <Wand2 className="mr-2 h-4 w-4" />
          <span>Learn More</span>
        </div>
      </div>
    </Link>
  );
};

export default AgentCard;
