"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, State } from 'wagmi';
import { config } from '@/lib/wagmi';

const queryClient = new QueryClient();

// A prop initialState é opcional mas ajuda na hidratação em SSR
export function Web3Provider({ children, initialState }: { children: React.ReactNode, initialState?: State }) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}