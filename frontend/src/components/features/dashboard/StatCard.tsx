import React from 'react';
import type { ChartDataPoint } from '@/types'; // Assumindo que você tem este tipo

// A prop `value` foi removida em favor de `children` para máxima flexibilidade.
type StatCardProps = {
  title: string;
  chartData?: ChartDataPoint[];
  children: React.ReactNode;
};

// Componente da barra do gráfico
const ChartBar = ({ height, label }: { height: string; label: string }) => (
  <div className="text-center space-y-2 flex flex-col items-center justify-end h-full">
    <div className="w-6 bg-primary/70 rounded-t-md transition-all duration-300 hover:bg-primary" style={{ height }}></div>
    <span className="text-xs text-neutral-400">{label}</span>
  </div>
);

const StatCard = ({ title, chartData = [], children }: StatCardProps) => {
  // Encontra o valor máximo nos dados para calcular a altura relativa das barras
  const maxChartValue = Math.max(...chartData.map(d => d.value), 1); // Evita divisão por zero

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
      <div>
        <h3 className="text-lg text-neutral-300">{title}</h3>
        {/* O conteúdo principal (valor, texto, botões, etc.) é renderizado aqui */}
        <div className="mt-2">
          {children}
        </div>
      </div>

      {/* Gráfico dinâmico na parte inferior */}
      <div className="flex justify-around items-end h-20 w-full mt-4">
        {chartData.length > 0 ? (
          chartData.slice(0, 5).reverse().map((data) => (
            <ChartBar 
              key={data.month} 
              label={data.month} 
              height={`${(data.value / maxChartValue) * 100}%`} 
            />
          ))
        ) : (
          <div className="w-full h-full border-t border-dashed border-zinc-700/50 mt-4"></div>
        )}
      </div>
    </div >
  );
};

export default StatCard;