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
        <Link href="/marketplace" className="text-white hover:text-primary transition-colors font-medium text-[20px]">
          Marketplace
        </Link>
      </div>

      {/* Botão de Ação */}
      {token && user ? (
        <div className="flex items-center gap-3 rounded-full border border-primary/80 px-4 py-2 text-[20px]">
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
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="rounded-full border border-white bg-primary hover:bg-primary/90 px-6 py-2 text-[20px]"
          >
            <Link href="/login" className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span>Sign In</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border border-white text-white hover:bg-white/10 px-6 py-2 text-[20px]"
          >
            <Link href="/register">
              Sign Up
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}