import type { ReactNode } from 'react';
import { logoStrip } from '../content';

// 代码绘制的几何 glyph + 名称，全部为自绘图形，不使用任何真实品牌 logo。
interface MarkSpec {
  name: string;
  glyph: ReactNode;
  textClass: string;
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const MARKS: MarkSpec[] = [
  {
    name: 'Java',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M4 8.5 12 13l8-4.5" />
        <path d="M4 14.5 12 19l8-4.5" />
      </svg>
    ),
    textClass: 'font-display text-[19px] font-semibold tracking-[-0.01em]',
  },
  {
    name: 'Spring Boot',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M12 4 19 16H5z" />
        <path d="M4 20h16" />
      </svg>
    ),
    textClass: 'font-display text-[18px] font-medium',
  },
  {
    name: 'MySQL',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
    textClass: 'font-sans text-[18px] font-bold tracking-[-0.02em]',
  },
  {
    name: 'MyBatis',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <rect x="6.2" y="6.2" width="11.6" height="11.6" transform="rotate(45 12 12)" />
      </svg>
    ),
    textClass: 'font-mono text-[16px] font-semibold',
  },
  {
    name: 'Vue 3',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M3.5 5.5 12 19l8.5-13.5" />
        <path d="M8.5 5.5 12 11l3.5-5.5" />
      </svg>
    ),
    textClass: 'font-sans text-[19px] font-bold tracking-[-0.03em]',
  },
  {
    name: 'Spring AI',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M12 3c.6 4.8 4.2 8.4 9 9-4.8.6-8.4 4.2-9 9-.6-4.8-4.2-8.4-9-9 4.8-.6 8.4-4.2 9-9z" />
      </svg>
    ),
    textClass: 'font-display text-[18px] font-semibold',
  },
  {
    name: 'Git',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <circle cx="7" cy="6.5" r="2.6" />
        <circle cx="17" cy="17.5" r="2.6" />
        <path d="M7 9.5v3.5c0 2.5 2 4.5 4.5 4.5h2.5" />
      </svg>
    ),
    textClass: 'font-sans text-[19px] font-medium',
  },
  {
    name: 'Linux',
    glyph: (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
        <path d="M4 15a8 8 0 0 1 16 0" />
        <path d="M20 15c1.4 0 2 .8 2 1.8" />
        <path d="M3 19.5h18" />
      </svg>
    ),
    textClass: 'font-display text-[15px] font-semibold uppercase tracking-[0.06em]',
  },
];

export default function Wordmarks({ item }: { item: string }) {
  const mark = MARKS.find((m) => m.name === item) ?? MARKS[0];
  return (
    <span className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-logo-gray transition-colors duration-200 hover:text-ink">
      {mark.glyph}
      <span className={mark.textClass}>{mark.name}</span>
    </span>
  );
}

export function allMarkNames(): string[] {
  return logoStrip.items;
}
