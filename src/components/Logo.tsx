import { useId } from 'react';
import { site } from '../content';

export function LogoMark({ size = 28 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF9E7A" />
          <stop offset="0.5" stopColor="#B39DFF" />
          <stop offset="1" stopColor="#8FD3FF" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
      <path d="M9 19 C 12 13, 16 11, 23 10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="22" cy="21" r="2" fill="#fff" />
    </svg>
  );
}

export default function Logo() {
  return (
    <a href="#top" className="flex items-center gap-[10px]" aria-label={`${site.name} · 回到顶部`}>
      <LogoMark size={28} />
      <span className="font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">{site.name}</span>
    </a>
  );
}
