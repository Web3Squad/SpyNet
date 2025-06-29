// src/app/layout.tsx

"use client"; // Define o layout inteiro como um "Client Component"

import type React from "react";
// A tipagem de Metadata ainda pode ser importada, mas a exportação precisa ser removida ou ajustada.
// import type { Metadata } from "next"; 
import { Work_Sans } from "next/font/google";

// Todos os providers e componentes de UI são importados aqui
import { Web3Provider } from "@/providers/Web3Provider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Navbar } from "@/components/ui/navBar";
import { Footer } from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const workSans = Work_Sans({ 
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-sans",
});

/*
  A exportação de 'metadata' não funciona em um Client Component.
  Você deve movê-la para a página (page.tsx) mais próxima ou para um 
  layout de servidor pai, se houver. Por enquanto, vamos comentar.

  export const metadata: Metadata = {
    title: "SpyAgents",
    description: "Marketplace de APIs com Pagamentos On-Chain",
  };
*/


// Como o layout agora é "use client", ele não pode mais ser uma função 'async'.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  // A lógica de `initialState` do servidor foi removida.
  // O Web3Provider da wagmi cuidará da inicialização do estado no cliente.

  return (
    <html lang="pt-br" className="dark">
      <head>
        {/* Metadados podem ser adicionados aqui diretamente se forem estáticos */}
        <title>SpyAgents</title>
        <meta name="description" content="Marketplace de APIs com Pagamentos On-Chain" />
      </head>
      <body className={`${workSans.variable} font-sans flex flex-col min-h-screen bg-background`}> 
        <Web3Provider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <Footer />
            <Toaster richColors theme="dark" />
          </AuthProvider>
        </Web3Provider>
      </body>
    </html>
  );
}