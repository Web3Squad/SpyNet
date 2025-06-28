"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,      
  DialogTitle,       
  DialogDescription, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { WalletConnectModal } from "./WalletConnectModal";
import { useAccount, useDisconnect } from "wagmi";

export function ConnectWalletButton() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
        <div className="flex items-center gap-3 rounded-full border border-primary/80 px-4 py-2 text-sm">
            <span className="font-medium text-white truncate max-w-[100px]">{address}</span>
            <div className="h-4 w-px bg-white/30" />
            <button
                onClick={() => disconnect()}
                className="font-medium text-white/70 hover:text-white transition-colors"
            >
                Sair
            </button>
        </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-primary hover:bg-primary/90">Conectar Carteira</Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-none shadow-none p-0">
        <DialogHeader className="sr-only"> 
          <DialogTitle>Conecte Sua Carteira</DialogTitle>
          <DialogDescription>
            Escolha uma das opções de carteira abaixo para conectar ao nosso serviço.
          </DialogDescription>
        </DialogHeader>
        <WalletConnectModal />
      </DialogContent>
    </Dialog>
  );
}