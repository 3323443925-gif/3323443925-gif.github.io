import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import WorkCover from '../components/WorkCover';
import { works, worksSection, type VideoItem } from '../content';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Works({ openVideo }: { openVideo: (v: VideoItem) => void }) {
  return (
    <section id="works" className="py-[88px] md:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ENTRANCE }}
          className="max-w-[640px]"
        >
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-iris">{worksSection.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(34px,4vw,56px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            {worksSection.h2}
          </h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-ink-soft">{worksSection.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.06, ease: ENTRANCE }}
          className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 min-[860px]:grid-cols-3 min-[1100px]:grid-cols-4 min-[1240px]:grid-cols-5 md:gap-x-5"
        >
          {works.map((work, i) => {
            const pad = String(i + 1).padStart(2, '0');
            return (
              <motion.article
                key={work.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: (i % 5) * 0.06, ease: ENTRANCE }}
                className="min-w-0"
              >
                <button
                  type="button"
                  onClick={() => openVideo({ index: `CUT ${pad}`, title: work.title, src: work.src })}
                  aria-label={`播放${work.title}`}
                  className="group relative block w-full cursor-pointer overflow-hidden rounded-[12px] border border-line bg-surface text-left transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="block aspect-[4/5] w-full">
                    <WorkCover index={i + 1} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 right-3 grid h-[34px] w-[34px] place-items-center rounded-full border border-line bg-white/90 text-ink transition-all duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
                  >
                    <Play size={13} className="ml-0.5" />
                  </span>
                </button>
                <div className="pt-3">
                  <p className="m-0 font-mono text-[10px] tracking-[0.08em] text-muted">CUT {pad}</p>
                  <h3 className="m-0 mt-1 text-[15px] font-semibold leading-[1.35] text-ink">{work.title}</h3>
                  <p className="m-0 mt-1 font-mono text-[10px] tracking-[0.04em] text-muted">脚本 / 剪辑</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ENTRANCE }}
          className="mt-16"
        >
          <p className="m-0 text-center font-display text-[19px] font-medium tracking-[-0.01em] text-ink-soft">
            {worksSection.craftQuote}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {worksSection.craft.map((c) => (
              <div
                key={c.num}
                className="rounded-panel border border-line bg-surface p-6 shadow-card transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="font-mono text-[11px] tracking-[0.08em] text-iris">{c.num}</span>
                <h3 className="m-0 mt-2 font-display text-[20px] font-semibold text-ink">{c.title}</h3>
                <p className="m-0 mt-2 text-[14px] leading-[1.75] text-ink-soft">{c.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col justify-between gap-1.5 border-t border-line pt-4 font-mono text-[10.5px] tracking-[0.04em] text-muted sm:flex-row">
          <span>{worksSection.foot[0]}</span>
          <span>{worksSection.foot[1]}</span>
        </div>
      </div>
    </section>
  );
}
