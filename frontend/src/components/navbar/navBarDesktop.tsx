import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

type DesktopNavProps = {
  token: string | null;
  user: ReturnType<typeof useAuth>['user'];
  logout: () => void;
};

export function DesktopNav({ token, user, logout }: DesktopNavProps) {
  return (
    <div className="hidden md:flex items-center gap-8">
      {/* Links de Navegação */}
      <div className="flex items-center gap-8">
        <Link href="/marketplace" className="text-white hover:text-primary transition-colors font-medium">
          Marketplace
        </Link>
        <Link href="/empresas" className="text-white hover:text-primary transition-colors font-medium">
          Companies
        </Link>
        <Link href="/criadores" className="text-white hover:text-primary transition-colors font-medium">
          Creators
        </Link>
      </div>

      {/* Botão de Ação */}
      {token && user ? (
        <div className="flex items-center gap-3 rounded-full border border-primary/80 px-4 py-2 text-sm">
          <span className="font-medium text-white">Hello, {user.name}!</span>
          <div className="h-4 w-px bg-white/30" />
          <button
            onClick={logout}
            className="font-medium text-white/70 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <Button asChild className="rounded-full bg-primary hover:bg-primary/90 px-6 py-2">
          <Link href="/login" className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            <span>Sign In</span>
          </Link>
        </Button>
      )}
    </div>
  );
}