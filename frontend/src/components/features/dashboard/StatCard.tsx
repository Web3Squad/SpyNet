// src/components/features/dashboard/StatCard.tsx
import React from 'react';

type StatCardProps = {
  title: string;
  amount: string; // ou outro nome, como 'stat', 'number', etc.
};

// Componente simples para a barra do gráfico
const ChartBar = ({ height }: { height: string }) => (
  <div className="w-8 bg-primary rounded-t-md" style={{ height }}></div>
);

const StatCard = ({ title }: StatCardProps) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-8">
      <h3 className="text-lg text-neutral-300">{title}</h3>
      {/* Gráfico de Barras Fictício */}
      <div className="flex justify-around items-end h-32">
        <div className="text-center space-y-2">
          <ChartBar height="60%" />
          <span className="text-xs text-neutral-400">Jan/25</span>
        </div>
        <div className="text-center space-y-2">
          <ChartBar height="75%" />
          <span className="text-xs text-neutral-400">Fev/25</span>
        </div>
        <div className="text-center space-y-2">
          <ChartBar height="90%" />
          <span className="text-xs text-neutral-400">Mar/25</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;