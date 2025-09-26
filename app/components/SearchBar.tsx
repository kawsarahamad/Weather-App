'use client';
import { useState } from 'react';

type Props = { onSearch: (q: string) => void; isLoading?: boolean };

export default function SearchBar({ onSearch, isLoading }: Props) {
  const [q, setQ] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
    setQ('');
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-3xl mx-auto gap-3">
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <input
          className="w-full rounded-2xl bg-white/10 border border-white/10
                     pl-10 pr-4 py-3.5 placeholder-white/60 text-[15px]
                     focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/60 focus:bg-white/15"
          placeholder="Search for a place..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <button
        className="rounded-xl px-5 py-3.5 bg-[#3B82F6] hover:bg-[#2f6fe1] active:opacity-90
                   text-white text-sm font-medium shadow-md"
        disabled={isLoading}
      >
        {isLoading ? 'Searching…' : 'Search'}
      </button>
    </form>
  );
}
