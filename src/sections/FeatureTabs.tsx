import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, CircleCheck, CircleDot, ExternalLink, Play, Sparkles } from 'lucide-react';
import { demoVideos, featureTabs, projects, type ProjectPanel, type ProjectTab, type VideoItem } from '../content';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SWAP: [number, number, number, number] = [0.22, 1, 0.36, 1];

function StatusChip({ label }: { label: string }) {
  return (
    <span className="rounded-[6px] bg-positive-tint px-2 py-0.5 text-[12px] font-semibold text-positive">{label}</span>
  );
}

function PanelButtons({ tab, openVideo }: { tab: ProjectTab; openVideo: (v: VideoItem) => void }) {
  const primary =
    tab.video && tab.id === 'campus' ? demoVideos.campus : tab.video && tab.id === 'ecommerce' ? demoVideos.ecommerce : null;
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-line/80 pt-4">
      {primary && (
        <button
          type="button"
          onClick={() => openVideo(primary)}
          className="flex h-9 cursor-pointer items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#1F2940]"
        >
          <Play size={13} className="mr-1.5" />
          {featureTabs.videoLabel}
        </button>
      )}
      {tab.demoUrl && (
        <a
          href={tab.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center rounded-full border border-line bg-white/70 px-4 text-[13px] font-semibold text-ink transition-all duration-200 hover:-translate-y-px hover:bg-white"
        >
          {featureTabs.demoLabel}
          <ExternalLink size={13} className="ml-1.5" />
        </a>
      )}
      {tab.repoUrl && (
        <a
          href={tab.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center rounded-full border border-line bg-white/70 px-4 text-[13px] font-semibold text-ink transition-all duration-200 hover:-translate-y-px hover:bg-white"
        >
          {featureTabs.repoLabel}
          <ExternalLink size={13} className="ml-1.5" />
        </a>
      )}
    </div>
  );
}

function ChecklistBody({ panel }: { panel: Extract<ProjectPanel, { kind: 'checklist' }> }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h4 className="m-0 text-[15px] font-semibold text-ink">{panel.header}</h4>
        <span className="ml-auto rounded-full bg-iris-tint px-2.5 py-1 text-[12px] font-semibold text-iris">
          {panel.headerChip}
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {panel.groups.map((g) => (
          <div key={g.label}>
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="font-medium text-ink-soft">{g.label}</span>
              <span className="font-mono text-muted tnum">
                {g.done}/{g.total}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEEAF6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${(g.done / g.total) * 100}%`, background: 'linear-gradient(90deg, #FF9E7A, #B39DFF)' }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="my-4 h-px bg-line" />
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {panel.tasks.map((task) => (
          <li key={task.title} className="flex h-9 items-center gap-2.5 text-[13.5px] text-ink">
            {task.state === 'done' ? (
              <CircleCheck size={15} className="shrink-0 text-positive" />
            ) : (
              <CircleDot size={15} className="shrink-0 text-caution" />
            )}
            <span className="truncate">{task.title}</span>
            <span
              className={`ml-auto shrink-0 rounded-[6px] px-2 py-0.5 text-[12px] font-semibold ${
                task.state === 'done' ? 'bg-positive-tint text-positive' : 'bg-caution-tint text-caution'
              }`}
            >
              {task.state === 'done' ? '已完成' : '进行中'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TableBody({ panel }: { panel: Extract<ProjectPanel, { kind: 'table' }> }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h4 className="m-0 text-[15px] font-semibold text-ink">{panel.header}</h4>
        <span className="ml-auto rounded-full bg-iris-tint px-2.5 py-1 text-[12px] font-semibold text-iris">
          {panel.headerChip}
        </span>
      </div>
      <table className="mt-3 w-full border-collapse">
        <thead>
          <tr>
            {panel.columns.map((c) => (
              <th
                key={c}
                className="border-b border-line py-2 pr-3 text-left text-[12px] font-medium uppercase tracking-[0.04em] text-muted"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {panel.rows.map((row) => (
            <tr key={row.cells[0]}>
              {row.cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={`border-b border-line py-2.5 pr-3 align-top text-[13px] leading-snug ${
                    ci === 0 ? 'whitespace-nowrap font-semibold text-ink' : 'text-ink-soft'
                  }`}
                >
                  {cell}
                </td>
              ))}
              <td className="border-b border-line py-2.5 text-right align-top">
                <StatusChip label={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TimelineBody({ panel }: { panel: Extract<ProjectPanel, { kind: 'timeline' }> }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h4 className="m-0 text-[15px] font-semibold text-ink">{panel.header}</h4>
        <span className="ml-auto rounded-full bg-iris-tint px-2.5 py-1 text-[12px] font-semibold text-iris">
          {panel.headerChip}
        </span>
      </div>
      <ol className="relative m-0 mt-4 flex list-none flex-col gap-4 p-0 pl-6">
        <span className="absolute bottom-1 left-[3px] top-1 w-px bg-line" aria-hidden="true" />
        {panel.steps.map((step, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-6 top-1 h-2 w-2 rounded-full bg-iris" aria-hidden="true" />
            <span className="font-mono text-[12px] text-muted tnum">{String(i + 1).padStart(2, '0')}</span>
            <p className="m-0 mt-0.5 text-[13.5px] leading-snug text-ink">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PanelCard({ tab, openVideo }: { tab: ProjectTab; openVideo: (v: VideoItem) => void }) {
  return (
    <div className="glass-strong w-full rounded-panel p-5" style={{ transform: 'translateZ(30px)' }}>
      {tab.panel.kind === 'checklist' && <ChecklistBody panel={tab.panel} />}
      {tab.panel.kind === 'table' && <TableBody panel={tab.panel} />}
      {tab.panel.kind === 'timeline' && <TimelineBody panel={tab.panel} />}
      <PanelButtons tab={tab} openVideo={openVideo} />
    </div>
  );
}

export default function FeatureTabs({ openVideo }: { openVideo: (v: VideoItem) => void }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const accRef = useRef(0);
  const cooldownRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const select = (i: number, user = false) => {
    setActive(i);
    accRef.current = 0;
    if (user) cooldownRef.current = performance.now() + 15000;
  };

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const el = sectionRef.current;
      const hovering = el ? el.matches(':hover') || el.contains(document.activeElement) : false;
      if (!hovering && now >= cooldownRef.current) accRef.current += dt;
      const p = Math.min(accRef.current / 7000, 1);
      if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;
      if (accRef.current >= 7000) {
        accRef.current = 0;
        setActive((a) => (a + 1) % projects.length);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight';
    const prev = e.key === 'ArrowUp' || e.key === 'ArrowLeft';
    if (!next && !prev) return;
    e.preventDefault();
    select((active + (next ? 1 : -1) + projects.length) % projects.length, true);
  };

  const current = projects[active];

  const stageBlobs = {
    background: [
      'radial-gradient(45% 45% at 15% 10%, rgba(255,158,122,0.40), transparent 45%)',
      'radial-gradient(45% 45% at 95% 40%, rgba(179,157,255,0.35), transparent 45%)',
      'radial-gradient(45% 45% at 40% 100%, rgba(143,211,255,0.35), transparent 45%)',
      '#F3F1EE',
    ].join(', '),
  };

  return (
    <section id="projects" ref={sectionRef} className="py-[88px] md:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ENTRANCE }}
          className="mx-auto max-w-[720px] text-center"
        >
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-iris">{featureTabs.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(34px,4vw,56px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            {featureTabs.h2}
          </h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-ink-soft">{featureTabs.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.06, ease: ENTRANCE }}
          className="mt-16"
        >
          {/* 移动端横向 pill chips */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden" role="tablist" aria-label="项目" onKeyDown={onKeyDown}>
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`mtab-${p.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${p.id}`}
                onClick={() => select(i, true)}
                className={`h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 text-[14px] font-semibold transition-colors duration-200 ${
                  active === i ? 'bg-ink text-white' : 'border border-line bg-surface text-ink-soft hover:text-ink'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* 移动端：当前 tab 的描述与要点 */}
          <div className="mb-6 lg:hidden">
            <p className="m-0 text-[15px] leading-[1.6] text-ink-soft">{current.summary}</p>
            <ul className="mt-3 flex list-none flex-col gap-2 p-0">
              {current.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-[14px] text-ink-soft">
                  <Check size={15} className="mt-0.5 shrink-0 text-iris" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
            {/* 桌面端 tab 列表 */}
            <div
              className="hidden flex-col gap-2 lg:col-span-5 lg:flex"
              role="tablist"
              aria-orientation="vertical"
              aria-label="项目"
              onKeyDown={onKeyDown}
            >
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={active === i}
                  aria-controls={`panel-${p.id}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => select(i, true)}
                  className={`relative w-full cursor-pointer rounded-panel px-6 py-5 text-left transition-colors duration-200 ${
                    active === i ? 'bg-surface shadow-card ring-1 ring-line' : 'hover:bg-surface/60'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[12px] text-muted tnum">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className={`font-display text-[20px] font-semibold tracking-[-0.01em] ${
                        active === i ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {p.title}
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: SWAP }}
                        className="overflow-hidden"
                      >
                        <p className="mb-0 mt-2 text-[16px] leading-[1.6] text-ink-soft">{p.summary}</p>
                        <ul className="mb-0 mt-3 flex list-none flex-col gap-2 p-0">
                          {p.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2 text-[15px] text-ink-soft">
                              <Check size={16} className="mt-0.5 shrink-0 text-iris" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {active === i && !reduced && (
                    <span className="absolute bottom-3 left-6 right-6 h-[2px] overflow-hidden rounded-full bg-[#EEEAF6]">
                      <span
                        ref={progressRef}
                        className="block h-full w-0"
                        style={{ background: 'linear-gradient(90deg, #FF9E7A, #B39DFF, #8FD3FF)' }}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* 面板舞台 */}
            <div className="lg:col-span-7">
              <div
                className="relative h-[420px] overflow-hidden rounded-frame lg:h-[540px]"
                style={stageBlobs}
              >
                <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1600px' }}>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={current.id}
                      role="tabpanel"
                      id={`panel-${current.id}`}
                      aria-labelledby={isMobile ? `mtab-${current.id}` : `tab-${current.id}`}
                      initial={{ opacity: 0, x: 32, rotateY: -14 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.5, ease: SWAP }}
                      className="w-[94%] lg:w-[88%]"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div style={{ transform: isMobile || reduced ? undefined : 'rotateX(4deg) rotateY(-6deg)', transformStyle: 'preserve-3d' }}>
                        <span
                          className="glass-chip absolute -top-4 right-4 z-10 flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold text-ink"
                          style={{ transform: 'translateZ(60px)' }}
                        >
                          <Sparkles size={14} className="text-iris" />
                          {current.chip}
                        </span>
                        <PanelCard tab={current} openVideo={openVideo} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
