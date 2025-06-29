// src/components/ui/LoadingSpinner.tsx
import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assumindo que você usa shadcn/ui e tem um utils.ts

type LoadingSpinnerProps = {
  className?: string;
  size?: number;
};

export function LoadingSpinner({ className, size = 48 }: LoadingSpinnerProps) {
  return (
    <LoaderCircle
      size={size}
      className={cn('animate-spin text-primary', className)}
    />
  );
}