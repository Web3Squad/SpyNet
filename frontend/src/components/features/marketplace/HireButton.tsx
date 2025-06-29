"use client"; // This component MUST be a client component

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

interface HireButtonProps extends ButtonProps {
  agentId: string;
}

export function HireButton({ agentId, size = 'default', className }: HireButtonProps) {
  const { token } = useAuth();
  const router = useRouter();

  const handleHireClick = () => {
    if (!token) {
      toast.info("Please log in to hire an agent.");
      router.push('/login'); 
    }
  };

  if (token) {
    return (
      <Button asChild size={size} className={className}>
        <Link href={`/marketplace/${agentId}/hire`}>
          {size === 'lg' ? 'Hire Now' : 'Hire'}
        </Link>
      </Button>
    );
  }

  return (
    <Button onClick={handleHireClick} size={size} className={className}>
       {size === 'lg' ? 'Hire Now' : 'Hire'}
    </Button>
  );
}