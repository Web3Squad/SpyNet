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
    <div className="md:hidden bg-background border-b border-border/10">
      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* Links de Navegação Mobile */}
        <div className="flex flex-col space-y-4">
          <Link href="/marketplace" className="text-white hover:text-primary transition-colors font-medium py-2" onClick={onClose}>
            Marketplace
          </Link>
          <Link href="/empresas" className="text-white hover:text-primary transition-colors font-medium py-2" onClick={onClose}>
            Companies
          </Link>
          <Link href="/criadores" className="text-white hover:text-primary transition-colors font-medium py-2" onClick={onClose}>
            Creators
          </Link>
        </div>

        {/* Botão de Ação Mobile */}
        <div className="pt-4 border-t border-border/10">
          {token && user ? (
            <div className="space-y-3 text-center">
              <span className="text-sm font-medium text-white block">Hello, {user.name}!</span>
              <Button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="rounded-full bg-primary hover:bg-primary/90 w-full"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              asChild
              className="rounded-full bg-primary hover:bg-primary/90 w-full"
              onClick={onClose}
            >
              <Link href="/login" className="flex items-center justify-center gap-2">
                <UserCircle className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}