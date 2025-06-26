// src/components/features/wallet/WalletConnect.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

export function WalletConnect() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true) }, []);

  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  
  if (!isClient) return null;

  if (isConnected) {
    return (
      <div>
        <p className="mb-2">Conectado como: {address}</p>
        <Button onClick={() => disconnect()}>Desconectar</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isPending}
        >
          {isPending ? 'Conectando...' : 
           connector.name === 'WalletConnect' 
             ? 'Conectar com outra carteira' 
             : `Conectar com ${connector.name}`}
        </Button>
      ))}
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  );
}