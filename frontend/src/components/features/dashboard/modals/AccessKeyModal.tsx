// src/components/features/dashboard/modals/AccessKeyModal.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Check, Copy, Rocket } from 'lucide-react';
import { toast } from 'sonner';

type AccessKeyModalProps = {
    apiKey: string;
};

export function AccessKeyModal({ apiKey }: AccessKeyModalProps) {
    const [hasCopied, setHasCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setHasCopied(true);
        toast.success("API Key copied to clipboard!");

        setTimeout(() => {
            setHasCopied(false);
        }, 2000); // Reset the icon after 2 seconds
    };

    return (
        <div className="max-w-2xl w-full mx-auto"> {/* Aumenta o tamanho do modal */}
            <DialogHeader>
                <DialogTitle className="text-white text-3xl">Access Key</DialogTitle>
                <DialogDescription className="text-base">
                    Keep your API Key safe! It is the key to access the agent.
                </DialogDescription>
            </DialogHeader>
            <div className="py-8">
                <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-between p-6 rounded-lg bg-primary text-primary-foreground font-mono text-lg"
                >
                    <span className="break-all">{apiKey}</span>
                    {hasCopied ? <Check size={20} /> : <Copy size={20} />}
                </button>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg text-lg py-6">
                        <Rocket size={20} className="mr-2" />
                        Confirm
                    </Button>
                </DialogClose>
            </DialogFooter>
        </div>
    );
}