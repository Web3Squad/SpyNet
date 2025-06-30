"use client";

import { useAccount, useBalance } from "wagmi";
import StatCard from "./StatCard";
import { Loader2 } from "lucide-react";
// Verifique se este caminho de importação está correto no seu projeto.
import { ConnectWalletButton } from "@/components/features/wallet/ConnectWalletButton"; 

export function BalanceStatCard() {
  const { address, isConnected } = useAccount();
  
  const { data: balance, isLoading: isBalanceLoading } = useBalance(
    address ? { address } : undefined
  );

  const renderContent = () => {
    // Se a carteira estiver conectada mas ainda estiver buscando o saldo
    if (isConnected && isBalanceLoading) {
      return (
        <div className="flex items-center text-neutral-400">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Fetching balance...</span>
        </div>
      );
    }
    
    // Se a carteira estiver conectada e o saldo tiver sido carregado
    if (isConnected && balance) {
      return (
        <div>
          <p className="text-4xl font-bold text-white">
            {parseFloat(balance.formatted).toFixed(4)}
            <span className="text-2xl text-neutral-400 ml-2">{balance.symbol}</span>
          </p>
        </div>
      );
    }

    // Se a carteira não estiver conectada
    return (
      <div className="space-y-4">
        <p className="text-neutral-400">Connect your wallet to see your balance.</p>
        <ConnectWalletButton />
      </div>
    );
  };

  return (
    <StatCard title="Available Balance">
      {renderContent()}
    </StatCard>
  );
}