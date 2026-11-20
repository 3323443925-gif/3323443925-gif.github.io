import { Check } from 'lucide-react';
import { heroPanels } from '../../content';

export default function ArticleToast() {
  const p = heroPanels.toast;
  return (
    <div className="glass rounded-panel flex items-center gap-3 p-5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-positive-tint">
        <Check size={18} className="text-positive" />
      </span>
      <div className="min-w-0">
        <p className="m-0 text-[14px] font-semibold leading-tight text-ink">{p.title}</p>
        <p className="m-0 mt-1 truncate text-[12.5px] leading-snug text-muted" title={p.text}>
          {p.text}
        </p>
      </div>
      <a href={p.link.href} className="ml-auto shrink-0 text-[13px] font-semibold text-iris hover:underline">
        {p.link.label}
      </a>
    </div>
  );
}
