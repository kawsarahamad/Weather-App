'use client';
import { useEffect, useRef, useState } from 'react';
import type { Units } from '@/lib/types';

type Props = { value: Units; onChange: (u: Units) => void };

export default function UnitToggle({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm
                   hover:bg-white/15 border border-white/10 shadow-sm"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="opacity-90">Units</span>
        <span className="text-xs opacity-70">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-28 rounded-lg bg-[#1B1840]/95 backdrop-blur
                     border border-white/10 shadow-lg overflow-hidden z-50"
        >
          {(['metric', 'imperial'] as Units[]).map(u => (
            <button
              key={u}
              onClick={() => { onChange(u); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10
                         ${value === u ? 'text-white' : 'text-white/80'}`}
              role="menuitem"
            >
              {u === 'metric' ? '°C' : '°F'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
