import { motion, useReducedMotion } from 'motion/react';
import {
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  KeyRound,
  Layers,
  Package,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import CodeCard from '../components/panels/CodeCard';
import { platform } from '../content';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  database: Database,
  layers: Layers,
  brain: Brain,
  sparkles: Sparkles,
  key: KeyRound,
  cloud: Cloud,
  branch: GitBranch,
  package: Package,
  terminal: Terminal,
  send: Send,
};

export default function Platform() {
  const reduced = useReducedMotion();

  return (
    <section id="stack" className="py-[88px] md:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ENTRANCE }}
          className="max-w-[640px]"
        >
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-iris">{platform.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(34px,4vw,56px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            {platform.h2}
          </h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-ink-soft">{platform.sub}</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1 技术栈 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: ENTRANCE }}
            className="rounded-frame border border-line bg-surface p-6 shadow-card transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lift md:p-8 lg:col-span-7"
          >
            <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">
              {platform.card1.title}
            </h3>
            <p className="m-0 mt-2 text-[15.5px] leading-[1.6] text-ink-soft">{platform.card1.text}</p>
            <div className="mt-7 grid grid-cols-4 gap-4 sm:grid-cols-6">
              {platform.card1.tiles.map((tile, i) => {
                const Icon = ICONS[tile.icon] ?? Code2;
                return (
                  <div key={`${tile.label}-${i}`} className="flex flex-col items-center gap-2">
                    <div
                      className={`grid h-14 w-full place-items-center rounded-[16px] border border-line bg-surface shadow-card ${
                        reduced ? '' : 'animate-bob-sm'
                      }`}
                      style={{ animationDelay: `${i * 0.35}s` }}
                    >
                      <Icon size={24} className="text-ink-soft" />
                    </div>
                    <span className="text-center text-[11.5px] leading-tight text-muted">{tile.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Card 2 代码窗（深色） */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.06, ease: ENTRANCE }}
            className="rounded-frame bg-ink p-6 md:p-8 lg:col-span-5 lg:row-span-2"
          >
            <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-white">
              {platform.card2.title}
            </h3>
            <p className="m-0 mt-2 text-[15.5px] leading-[1.6] text-white/70">{platform.card2.text}</p>
            <div className="mt-6">
              <CodeCard />
            </div>
            <p className="m-0 mt-5 flex items-center gap-2.5 text-[12.5px] text-white/60">
              <span className="animate-pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-positive" aria-hidden="true" />
              {platform.card2.note}
            </p>
          </motion.div>

          {/* Card 3 工程实践 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.12, ease: ENTRANCE }}
            className="rounded-frame border border-line bg-surface p-6 shadow-card transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lift md:p-8 lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">
                  {platform.card3.title}
                </h3>
                <p className="m-0 mt-2 text-[15.5px] leading-[1.6] text-ink-soft">{platform.card3.text}</p>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {platform.card3.chips.map((chip) => (
                  <span
                    key={chip}
                    className="flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-[14px] font-medium text-ink"
                  >
                    <ShieldCheck size={16} className="shrink-0 text-positive" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
