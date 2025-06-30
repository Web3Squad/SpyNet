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
    toast.success("API key copied to clipboard!");
    setTimeout(() => setHasCopied(false), 2000); // Reset icon after 2 seconds
  };

  const goToDashboard = () => {
    // The 404 error was because the /dashboard/contracts route does not exist.
    // The correct route for the company dashboard is /company-dashboard.
    router.push('/company-dashboard');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Agent Successfully Hired!</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Your API key has been generated. Keep it in a safe place, as it will not be shown again.
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
            Go to Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}