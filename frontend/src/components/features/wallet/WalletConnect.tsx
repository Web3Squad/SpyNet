// src/components/features/wallet/WalletConnect.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  if (isConnected) {
    return (
      <div>
        <p className="mb-2">Conectado como: {address}</p>
        <Button onClick={() => disconnect()}>Desconectar</Button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isPending}
        >
          {isPending ? 'Conectando...' : `Conectar com ${connector.name}`}
        </Button>
      ))}
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  );
}