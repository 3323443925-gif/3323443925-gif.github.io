import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { metrics } from '../content';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function CountUp({ value, run, delay }: { value: number; run: boolean; delay: number }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    if (!run) return;
    let raf = 0;
    let start = -1;
    const tick = (now: number) => {
      if (start < 0) start = now + delay;
      const t = Math.min(Math.max((now - start) / 1400, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value, delay, reduced]);

  return <span className="tnum">{display}</span>;
}

export default function Metrics() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="py-14">
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <div ref={ref} className="border-y border-line py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: ENTRANCE }}
            className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-line"
          >
            {metrics.map((m, i) => (
              <div key={m.label} className={`min-w-0 md:px-8 ${i === 0 ? 'md:pl-0' : ''}`}>
                <p className="m-0 font-display text-[clamp(40px,4.4vw,60px)] font-semibold leading-none tracking-[-0.03em] text-ink">
                  <CountUp value={m.value} run={inView} delay={i * 100} />
                </p>
                <p className="m-0 mt-2 text-[16px] font-medium text-ink">{m.label}</p>
                <p className="m-0 mt-1 max-w-[220px] text-[13.5px] text-muted">{m.note}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
