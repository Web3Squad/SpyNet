"use client";

import { Button } from "@/components/ui/button";
import { useConnect } from "wagmi";
import { Rocket } from "lucide-react";

const MetamaskIcon = () => (
  <svg width="32" height="32" viewBox="0 0 118.9 107.2">
    {/* ... (código SVG do logo do Metamask) ... */}
    <path fill="#E2761B" d="M118.9 59.8c-2.2-1.1-4.4-2.1-6.6-3.1-4-1.8-8-3.6-12-5.4-1-.5-2-.9-3-1.4 0-1 .1-1.9.1-2.9 0-.2.1-.4.1-.6.1-.5.1-1 .2-1.5.3-2.8.6-5.6 1-8.4.1-.7.2-1.4.3-2.1.6-2.9 1.2-5.7 1.9-8.5.3-1.1.6-2.2.9-3.3.6-2 .9-4.1 1-6.1.1-1.1.1-2.2.1-3.3 0-.4.1-.8.1-1.2 0-.2,0-.3-.1-.5-.1-.4-.2-.8-.3-1.3-.4-1.2-.9-2.4-1.5-3.5-.6-1.1-1.3-2.2-2-3.3-1.6-2.3-3.5-4.4-5.7-6.3-1-1.1-2.1-2-3.2-3-.2-.2-.4-.4-.6-.6-.4-.3-.7-.6-1.1-.9-2-1.4-4.2-2.6-6.4-3.5-1.3-.5-2.6-1-3.9-1.4-3.9-1.2-7.9-1.8-11.9-1.9-4.9-.1-9.8.5-14.6 1.7-2.6.7-5.2 1.6-7.7 2.7-5.7 2.6-10.9 6.2-15.3 10.5-1.5 1.5-2.9 3.1-4.2 4.8-.8 1-1.5 2-2.2 3.1-.5.8-1 1.7-1.5 2.5-.2.4-.4.8-.6 1.2-1.1 2.2-2 4.6-2.7 7-.2.7-.4 1.4-.5 2.1-.4 2.5-.7 5.1-.9 7.6-.1 1.1-.1 2.2-.1 3.3 0 .4.0 1-.1 1.4-.1.3-.1.5-.1.8 0 .4.1.8.1 1.2.1 1.8.3 3.6.6 5.4.3 1.2.6 2.4.9 3.6.8 3.3 1.7 6.6 2.8 9.8.1.3.2.6.3.9l.3.8c.2.6.5 1.2.7 1.8 1.1 2.7 2.3 5.4 3.7 8 .7 1.3 1.4 2.6 2.1 3.9 1.3 2.1 2.7 4.2 4.2 6.2 2.3 3 5 5.8 7.9 8.2 3.5 2.9 7.3 5.2 11.2 7 2.1 1 4.3 1.8 6.5 2.4 4.5 1.3 9.1 2 13.7 2.1 5.4.1 10.8-.5 16.1-1.7 4.2-1 8.3-2.5 12.2-4.5 1.1-.5 2.2-1.1 3.3-1.7.9-.5 1.8-1.1 2.7-1.7 2.8-2 5.4-4.2 7.7-6.7 1-1.1 1.9-2.2 2.8-3.4 2.1-2.6 3.8-5.5 5.2-8.5.5-1.1.9-2.2 1.3-3.3.9-2.2 1.6-4.5 2.1-6.8.2-1 .3-1.9.5-2.9.1-.5.2-1 .2-1.5s.1-1.1.1-1.6c0-.5-.1-1-.1-1.5zM33.8 31.7c-2.1-1.1-4-2.5-5.6-4.1-1-.9-1.8-2-2.5-3.1-1-1.6-1.8-3.3-2.4-5.1-.2-.8-.4-1.6-.6-2.5-.3-1.8-.5-3.7-.6-5.5 0-.7,0-1.5,0-2.2,0-.5.1-1,.1-1.5.1-1.2.3-2.5.5-3.7.2-.9.5-1.8.8-2.7.5-1.8 1.2-3.5 2-5.1.7-1.3 1.5-2.6 2.4-3.8 2.3-3.1 5.3-5.7 8.7-7.7 2.3-1.3 4.7-2.3 7.2-3.1 3.5-1.1 7-1.8 10.6-2 3-.2 6-.1 8.9.3 3.6.5 7.1 1.4 10.5 2.7 2.2.9 4.4 1.9 6.4 3.1 3.1 1.9 5.9 4.2 8.3 6.8.9 1 1.8 2.1 2.6 3.2 1.5 2.1 2.7 4.4 3.6 6.8.4 1.1.8 2.2 1.1 3.3.6 2.2 1 4.4 1.2 6.7.1 1 .2 2 .2 3 0 .7,0 1.4-.1 2.1-.1.9-.3 1.8-.5 2.7-.4 1.9-.9 3.8-1.6 5.6-.6 1.6-1.4 3.1-2.2 4.6-.9 1.5-1.9 2.9-3 4.3-2.9 3.6-6.4 6.7-10.2 9-2.2 1.3-4.5 2.4-6.8 3.3-3.4 1.3-6.8 2.2-10.3 2.7-3.2.4-6.4.5-9.6.2-3.6-.4-7.2-1.2-10.6-2.5-4.2-1.6-8.2-3.8-11.8-6.5-.4-.3-.8-.6-1.2-.9z" transform="translate(-1.4 -1.4)"/></svg>
);
const WalletConnectIcon = () => (
  <svg width="32" height="32" viewBox="0 0 40 32">
    <path d="M26.653 32H39.99v-9.117L26.653 32zM24.223 32l13.33-9.117V9.752L24.223 32zM21.794 32l13.33-18.248V9.752L21.794 32zM19.364 32L32.694 9.752V5.53L19.364 32zM0 22.883L13.337 0h13.316L0 22.883zM2.43 22.883L15.767 0h4.223L2.43 22.883zM4.86 22.883L18.196 0h4.223L4.86 22.883zM7.289 22.883L20.626 0h4.223L7.289 22.883z" fill="#3B99FC" fillRule="nonzero"/>
  </svg>
);
const CoinbaseIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16 22.4C19.5346 22.4 22.4 19.5346 22.4 16C22.4 12.4654 19.5346 9.6 16 9.6C12.4654 9.6 9.6 12.4654 9.6 16C9.6 19.5346 12.4654 22.4 16 22.4Z" fill="#0052FF"/>
    </svg>
);

type WalletConnectModalProps = {
  onClose?: () => void;
};

export function WalletConnectModal({ onClose }: WalletConnectModalProps) {
  const { connect, connectors, isPending } = useConnect();

  const metamask = connectors.find(c => c.id === 'metaMask');
  const coinbase = connectors.find(c => c.id === 'coinbaseWallet');
  const walletconnect = connectors.find(c => c.id === 'walletConnect');
  
  const handleConnect = (connector: any) => {
    if (connector) {
      connect({ connector });
      
    } else {
      alert("Conector não encontrado. Verifique se a carteira está instalada.");
    }
  };

  return (
    <div className="bg-[#1E1E1E] p-8 rounded-2xl w-full max-w-md mx-auto text-white">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Conecte Sua Carteira</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Sua carteira será usada para receber automaticamente os pagamentos pelas consultas dos seus agentes.
        </p>
      </div>

      {/* Opções de Carteira */}
      <div className="space-y-4">
        {metamask && (
          <button
            onClick={() => handleConnect(metamask)}
            disabled={isPending}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-700 bg-zinc-800 hover:border-primary transition-all"
          >
            <MetamaskIcon />
            <span className="font-semibold text-lg">Metamask</span>
          </button>
        )}
        {walletconnect && (
           <button
            onClick={() => handleConnect(walletconnect)}
            disabled={isPending}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-700 bg-zinc-800 hover:border-primary transition-all"
          >
            <WalletConnectIcon />
            <span className="font-semibold text-lg">Wallet Connect</span>
          </button>
        )}
        {coinbase && (
          <button
            onClick={() => handleConnect(coinbase)}
            disabled={isPending}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-700 bg-zinc-800 hover:border-primary transition-all"
          >
            <CoinbaseIcon />
            <span className="font-semibold text-lg">Coinbase</span>
          </button>
        )}
      </div>

      {/* Botão Finalizar */}
      <div className="mt-8">
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full h-14 text-lg font-semibold border-primary text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Rocket className="mr-2 h-5 w-5" />
          Finalizar
        </Button>
      </div>
    </div>
  );
}