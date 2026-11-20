import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import Prose from '../components/Prose';
import { articles, writing } from '../content';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SWAP: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Writing() {
  const [open, setOpen] = useState(0);

  return (
    <section id="writing" className="py-[88px] md:py-32">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ENTRANCE }}
          className="lg:col-span-4 lg:sticky lg:top-[120px] lg:self-start"
        >
          <h2 className="m-0 font-display text-[clamp(34px,4vw,56px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            {writing.h2}
          </h2>
          <p className="m-0 mt-4 text-[16px] leading-[1.6] text-ink-soft">{writing.text}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.06, ease: ENTRANCE }}
          className="lg:col-span-8"
        >
          {articles.map((article, i) => {
            const isOpen = open === i;
            return (
              <div key={article.slug} className="border-t border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`article-${article.slug}`}
                  className="flex w-full cursor-pointer items-center gap-4 py-6 text-left"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[19px] font-semibold leading-snug text-ink">
                      {article.title}
                    </span>
                    <span className="mt-1 block text-[13px] text-muted">
                      {article.date} · {article.minutes} 分钟阅读
                    </span>
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface transition-transform duration-[250ms] ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <Plus size={20} className="text-ink-soft" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`article-${article.slug}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: SWAP }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <Prose blocks={article.blocks} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="border-t border-line" />
        </motion.div>
      </div>
    </section>
  );
}
