"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
}

export function SuccessModal({ isOpen, onClose, apiKey }: SuccessModalProps) {
  const router = useRouter();
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setHasCopied(true);
    toast.success("Chave de API copiada para a área de transferência!");
    setTimeout(() => setHasCopied(false), 2000); // Reseta o ícone após 2 segundos
  };

  const goToDashboard = () => {
    // O erro 404 era porque a rota /dashboard/contracts não existe.
    // A rota correta para o dashboard da empresa é /company-dashboard.
    router.push('/company-dashboard');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Agente Contratado com Sucesso!</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Sua chave de API foi gerada. Guarde-a em local seguro, pois ela não será exibida novamente.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <Input id="apiKey" value={apiKey} readOnly className="bg-zinc-800 border-zinc-700"/>
          <Button type="button" size="icon" variant="secondary" onClick={handleCopy}>
            {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <DialogFooter className="mt-6">
          <Button type="button" onClick={goToDashboard} className="w-full">
            Ir para o Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}