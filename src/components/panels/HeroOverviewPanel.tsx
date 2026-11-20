import { CircleCheck, CircleDot } from 'lucide-react';
import { heroPanels } from '../../content';

function Ring({ percent }: { percent: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF9E7A" />
          <stop offset="1" stopColor="#B39DFF" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r={r} fill="none" stroke="#EEEAF6" strokeWidth="6" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(percent / 100) * c} ${c}`}
        transform="rotate(-90 32 32)"
      />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fontFamily="'Instrument Sans Variable', system-ui, sans-serif"
        fontSize="15"
        fontWeight="600"
        fill="#0E1525"
      >
        {percent}%
      </text>
    </svg>
  );
}

export default function HeroOverviewPanel() {
  const p = heroPanels.overview;
  return (
    <div className="glass rounded-panel p-5">
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-positive" aria-hidden="true" />
        <span className="text-[15px] font-semibold text-ink">{p.title}</span>
        <span className="ml-auto rounded-full bg-iris-tint px-2.5 py-1 text-[12px] font-semibold text-iris">
          {p.chip}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Ring percent={p.ring.percent} />
        <div>
          <p className="m-0 text-[15px] font-semibold text-ink">{p.ring.label}</p>
          <p className="m-0 mt-0.5 text-[13px] text-muted">{p.ring.sub}</p>
        </div>
      </div>

      <div className="my-4 h-px bg-line" />

      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {p.rows.map((row) => (
          <li key={row.label} className="flex h-10 items-center gap-2.5 text-[13.5px] text-ink">
            {row.icon === 'check' ? (
              <CircleCheck size={16} className={row.tone === 'positive' ? 'shrink-0 text-positive' : 'shrink-0 text-muted'} />
            ) : (
              <CircleDot size={16} className="shrink-0 text-caution" />
            )}
            <a href={row.href} className="truncate transition-colors duration-150 hover:text-iris">
              {row.label}
            </a>
            <span className="ml-auto shrink-0 font-mono text-[12px] text-muted tnum">{row.meta}</span>
            <span
              className={`shrink-0 rounded-[6px] px-2 py-0.5 text-[12px] font-semibold ${
                row.chip.tone === 'positive'
                  ? 'bg-positive-tint text-positive'
                  : row.chip.tone === 'iris'
                    ? 'bg-iris-tint text-iris'
                    : 'bg-caution-tint text-caution'
              }`}
            >
              {row.chip.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
