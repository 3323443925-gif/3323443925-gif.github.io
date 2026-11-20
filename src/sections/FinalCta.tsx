import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CircleCheck, Sparkles } from 'lucide-react';
import MeshGradient from '../components/MeshGradient';
import { finalCta } from '../content';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FinalCta() {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: ENTRANCE }}
          className="relative min-h-[380px] overflow-hidden rounded-cta md:min-h-[440px]"
          style={{ boxShadow: '0 0 0 1px rgba(14,21,37,0.06)' }}
        >
          <MeshGradient seed={7} className="absolute inset-0 z-0" />

          <span
            className="glass absolute right-10 top-8 z-10 hidden h-[38px] items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold text-ink md:flex"
            style={{ animationDuration: '6s' }}
          >
            <Sparkles size={14} className="text-iris" />
            {finalCta.chipTop}
          </span>
          <span
            className="glass absolute bottom-8 left-10 z-10 hidden h-[38px] items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold text-ink md:flex"
            style={{ animationDuration: '7s' }}
          >
            <CircleCheck size={14} className="text-positive" />
            {finalCta.chipBottom}
          </span>

          <div className="relative z-10 flex min-h-[380px] flex-col items-center justify-center px-6 py-16 text-center md:min-h-[440px]">
            <h2 className="m-0 max-w-[760px] font-display text-[clamp(36px,4.6vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              {finalCta.h2}
            </h2>
            <p className="mt-5 max-w-[520px] text-[18px] leading-[1.6] text-ink-soft">{finalCta.sub}</p>
            <div className="mt-8 flex flex-col items-center gap-3 min-[640px]:flex-row">
              <a
                href={finalCta.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-[15.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#1F2940] min-[640px]:w-auto"
              >
                {finalCta.primary.label}
                <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-[3px]" />
              </a>
              <a
                href={finalCta.secondary.href}
                className="glass-chip flex h-12 w-full items-center justify-center rounded-full px-6 text-[15.5px] font-semibold text-ink min-[640px]:w-auto"
              >
                {finalCta.secondary.label}
              </a>
            </div>
            <p className="mt-4 text-[13.5px] font-medium text-ink-soft">{finalCta.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
