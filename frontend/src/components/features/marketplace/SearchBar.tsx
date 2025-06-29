// src/components/features/marketplace/SearchBar.tsx
"use client";

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
   
    console.log("Searching for:", query);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative w-full max-w-2xl mx-auto"
    >
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for marketing, finance, development agents..."
        className="w-full h-16 pl-12 pr-4 rounded-full bg-zinc-900 border-zinc-700 text-white text-base placeholder:text-neutral-500 focus:border-primary"
      />
    </form>
  );
}