"use client";

import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react'; // 1. Importar useEffect
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // 2. Importar os hooks de rota

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 3. Obter o estado atual da URL com os hooks
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 4. Efeito para desligar o loading QUANDO a URL mudar
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]); // Dependências: qualquer mudança na URL desliga o loading

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    const encodedQuery = encodeURIComponent(query);
    router.push(`/marketplace?query=${encodedQuery}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Search />
        )}
      </div>
      
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe your need... e.g., 'an agent to analyze legal contracts'"
        className="w-full h-16 pl-12 pr-4 rounded-full bg-zinc-900 border-zinc-700 text-white text-base placeholder:text-neutral-500 focus:border-primary disabled:opacity-75"
        disabled={isLoading}
      />
    </form>
  );
}