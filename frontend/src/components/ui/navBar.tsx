"use client"

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import { DesktopNav } from "../../components/navbar/navBarDesktop"; 
import { MobileNav } from "../../components/navbar/navBarMobile";   

export function Navbar() {
  const { token, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCloseMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/10">
      <nav className="container mx-auto h-20 flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">LOGO</span>
        </Link>

        {/* Navegação Desktop agora é um componente separado */}
        <DesktopNav token={token} user={user} logout={logout} />

        {/* Botão de Menu Mobile */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Menu Mobile agora é um componente separado */}
      <MobileNav
        isOpen={mobileMenuOpen}
        token={token}
        user={user}
        logout={logout}
        onClose={handleCloseMenu}
      />
    </header>
  );
}