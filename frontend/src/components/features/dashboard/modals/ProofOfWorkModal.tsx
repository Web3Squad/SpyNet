// src/components/features/dashboard/modals/ProofOfWorkModal.tsx
import React from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

type WorkProof = {
    agentName: string;
    date: string;
    duration: string;
    cost: string;
    result: string;
};

type ProofOfWorkModalProps = {
    proofs: WorkProof[];
};

export function ProofOfWorkModal({ proofs }: ProofOfWorkModalProps) {
    return (
        <div className="w-full h-full mx-auto"> {/* <-- ajuste aqui */}
            <DialogHeader>
                <DialogTitle className="text-white text-2xl mb-6">Proofs of Work</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-3 text-sm">
                <div className="grid grid-cols-5 gap-4 px-4 text-neutral-400 font-semibold">
                    <div>Agent</div>
                    <div>Date</div>
                    <div>Duration</div>
                    <div>Cost</div>
                    <div>Result</div>
                </div>
                <div className="space-y-2">
                    {proofs.map((proof, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 items-center bg-zinc-800/50 p-4 rounded-lg text-white">
                            <div className="truncate">{proof.agentName}</div>
                            <div>{proof.date}</div>
                            <div>{proof.duration}</div>
                            <div>{proof.cost}</div>
                            <div className="text-primary truncate">{proof.result}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
