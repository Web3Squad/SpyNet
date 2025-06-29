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
    <div className="hidden md:flex items-center justify-end flex-1 gap-8">
      {token && user ? (
        <>
          {/* Links de navegação do usuário */}
          <Link href="/marketplace" className="text-white hover:text-primary transition-colors font-medium text-[20px]">
            Marketplace
          </Link>
          <Link href="/dashboard" className="text-white hover:text-primary transition-colors font-medium text-[20px]">
            Controller
          </Link>
          <Link href="/perfil" className="text-white hover:text-primary transition-colors font-medium text-[20px]">
            Profile
          </Link>

          {/* Divisor Visual */}
          <div className="h-6 w-px bg-white/30" />

          {/* Menu do Usuário */}
          <div className="flex items-center gap-4">
              <span className="font-medium text-white text-[20px]">Hello, {user.name}!</span>
              <Button
                  onClick={logout}
                  className="rounded-full bg-zinc-800 hover:bg-zinc-700 px-8 py-2 text-white font-medium text-[20px]"
              >
                  Logout
              </Button>
          </div>
        </>
      ) : (
        // --- Layout para usuário deslogado ---
        <>
          <Link href="/marketplace" className="text-white hover:text-primary transition-colors font-medium text-[20px]">
            Marketplace
          </Link>
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
        </>
      )}
    </div>
  );
}