import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

type MobileNavProps = {
  isOpen: boolean;
  token: string | null;
  user: ReturnType<typeof useAuth>['user'];
  logout: () => void;
  onClose: () => void; 
};

export function MobileNav({ isOpen, token, user, logout, onClose }: MobileNavProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="md:hidden bg-background border-t border-border/10 animate-in fade-in-20 slide-in-from-top-4">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Links de Navegação Mobile */}
        <div className="flex flex-col space-y-4">
          {token && user ? (
            <>
              <Link href="/dashboard" className="text-white hover:text-primary transition-colors font-medium py-2 text-lg" onClick={onClose}>
                Controle
              </Link>
              <Link href="/perfil" className="text-white hover:text-primary transition-colors font-medium py-2 text-lg" onClick={onClose}>
                Perfil
              </Link>
            </>
          ) : (
            <Link href="/marketplace" className="text-white hover:text-primary transition-colors font-medium py-2 text-lg" onClick={onClose}>
              Marketplace
            </Link>
          )}
        </div>

        {/* Botão de Ação Mobile */}
        <div className="pt-6 border-t border-border/10">
          {token && user ? (
            <div className="space-y-4 text-center">
              <span className="text-md font-medium text-white block">Olá, {user.name}!</span>
              <Button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="rounded-full bg-zinc-800 hover:bg-zinc-700 w-full text-lg py-6"
              >
                Sair
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                asChild
                className="rounded-full bg-primary hover:bg-primary/90 w-full text-lg py-6"
                onClick={onClose}
              >
                <Link href="/login" className="flex items-center justify-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full w-full text-lg py-6"
                onClick={onClose}
              >
                <Link href="/register" className="flex items-center justify-center gap-2">
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}