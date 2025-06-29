"use client";

import React from "react";
import type { JSX } from "react";
import { useConnect, type Connector } from "wagmi";
import { toast } from "sonner";

// --- Icons (unchanged) ---
const MetamaskIcon = () => (
  <img src="/img/wallet/Metamask.png" alt="Metamask" width={32} height={32} />
);
const WalletConnectIcon = () => (
  <img src="/img/wallet/WalletConnect.png" alt="WalletConnect" width={32} height={32} />
);
const CoinbaseIcon = () => (
  <img src="/img/wallet/Coinbase.png" alt="Coinbase" width={32} height={32} />
);

// --- Types (unchanged) ---
type WalletConnectModalProps = {
  onConnectSuccess?: () => void;
};

type ConnectorDesign = {
  Icon: () => JSX.Element;
  name: string; // The name we want to display
  searchKey: string; // The keyword to search for in the connector's name
};

// --- Use an array for a more flexible lookup ---
const connectorDesigns: ConnectorDesign[] = [
  { Icon: MetamaskIcon, name: "Metamask", searchKey: "MetaMask" },
  { Icon: CoinbaseIcon, name: "Coinbase", searchKey: "Coinbase" },
  { Icon: WalletConnectIcon, name: "Wallet Connect", searchKey: "WalletConnect" },
  // For other injected wallets that are not MetaMask
  { Icon: MetamaskIcon, name: "Injected Wallet", searchKey: "Injected" },
];

export function WalletConnectModal({ onConnectSuccess }: WalletConnectModalProps) {
  const { connect, connectors, isPending } = useConnect();

  const handleConnect = (connector: Connector) => {
    connect(
      { connector },
      {
        onSuccess: () => {
          toast.success(`Successfully connected with ${connector.name}`);
          if (onConnectSuccess) {
            onConnectSuccess();
          }
        },
        onError: (error) => {
          // Handle common errors in a more user-friendly way
          if (error.message && error.message.toLowerCase().includes('not found')) {
            toast.error(`Wallet not found. Please install the ${connector.name} extension.`);
          } else {
            toast.error(`Failed to connect: ${error.message}`);
          }
        },
      }
    );
  };

  return (
    <div className="bg-[#1E1E1E] p-8 rounded-2xl w-full max-w-md mx-auto text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Connect Your Wallet</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Choose a provider to connect.
        </p>
      </div>

      <div className="space-y-4">
        {connectors.map((connector) => {
          // Find a design in our array whose 'searchKey' is included in the 'connector.name'
          const design = connectorDesigns.find((d) =>
            connector.name.includes(d.searchKey)
          );
          
          // If a design is found, use its Icon component. Otherwise, use null.
          const IconComponent = design ? design.Icon : null;
          // Use the custom name from our design, or fall back to the connector's default name.
          const displayName = design ? design.name : connector.name;

          return (
            <button
              key={connector.id}
              onClick={() => handleConnect(connector)}
              disabled={isPending}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-700 bg-zinc-800 hover:border-primary transition-all disabled:opacity-50"
            >
              {/* Conditionally render the icon ONLY if it exists */}
              {IconComponent && <IconComponent />}
              
              {/* If no icon, the text will align left due to flexbox properties */}
              <span className="font-semibold text-lg">
                {isPending ? `Connecting...` : displayName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}