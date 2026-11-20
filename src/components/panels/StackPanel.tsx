import { heroPanels } from '../../content';

export default function StackPanel() {
  const p = heroPanels.stack;
  return (
    <div className="glass rounded-panel p-5">
      <p className="m-0 text-[12.5px] text-muted">{p.label}</p>
      <div className="mt-1.5 flex items-center gap-2.5">
        <span className="font-display text-[28px] font-semibold leading-none tracking-[-0.02em] text-ink">
          {p.value}
        </span>
        <span className="rounded-full bg-iris-tint px-2.5 py-1 text-[12px] font-semibold text-iris">{p.chip}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.items.map((item) => (
          <span key={item} className="rounded-full bg-iris-tint px-2.5 py-1 text-[12px] font-medium text-iris">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
