// src/app/page.tsx
"use client";

import { WalletConnect } from "@/components/features/wallet/WalletConnect";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao SpyAgents</h1>
        <p className="text-xl mb-8">O marketplace de APIs descentralizado.</p>
        <WalletConnect />
        {/* <Link href="/apis" className="mt-4 inline-block text-blue-500 hover:underline">
            Ver APIs Disponíveis
        </Link> */}
      </div>
    </main>
  );
}