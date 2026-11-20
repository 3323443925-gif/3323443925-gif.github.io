import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import MeshGradient from '../components/MeshGradient';
import HeroOverviewPanel from '../components/panels/HeroOverviewPanel';
import StackPanel from '../components/panels/StackPanel';
import ArticleToast from '../components/panels/ArticleToast';
import { hero } from '../content';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return isDesktop;
}

export default function Hero() {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement | null>(null);

  const base = isDesktop ? { x: 10, y: -16, z: 2 } : { x: 6, y: -8, z: 0 };
  const spring = { stiffness: 90, damping: 18 };
  const rx = useSpring(base.x, spring);
  const ry = useSpring(base.y, spring);
  const rz = useSpring(base.z, spring);

  useEffect(() => {
    rx.set(base.x);
    ry.set(base.y);
    rz.set(base.z);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(base.y + nx * 6);
    rx.set(base.x - ny * 4);
  };

  const onPointerLeave = () => {
    rx.set(base.x);
    ry.set(base.y);
  };

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const scrollRotX = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const tilt = useMotionTemplate`rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;

  const textReveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: ENTRANCE },
  });

  const panelReveal = (delay: number) => ({
    initial: { opacity: 0, y: 80, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 1.0, delay, ease: ENTRANCE },
  });

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative min-h-[760px] overflow-hidden pt-[120px] pb-24 lg:min-h-[880px] lg:pt-[152px]"
    >
      <MeshGradient seed={1} className="absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto grid max-w-container grid-cols-1 gap-16 px-5 sm:px-6 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <motion.div {...textReveal(0.05)}>
            <a
              href={hero.eyebrow.href}
              className="glass-chip group inline-flex h-8 items-center gap-2 rounded-full py-0 pl-1.5 pr-3.5 text-[13.5px] font-medium text-ink"
            >
              <span className="flex h-5 items-center rounded-full bg-ink px-2 text-[11.5px] font-semibold text-white">
                {hero.eyebrow.pill}
              </span>
              {hero.eyebrow.text}
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-[3px]" />
            </a>
          </motion.div>

          <motion.h1
            {...textReveal(0.12)}
            className="mt-6 max-w-[620px] font-display text-[clamp(44px,6vw,84px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
          >
            {hero.h1[0]}
            <br className="hidden md:block" />
            {hero.h1[1]}
          </motion.h1>

          <motion.p {...textReveal(0.24)} className="mt-6 max-w-[520px] text-[19px] leading-[1.6] text-ink-soft">
            {hero.subline}
          </motion.p>

          <motion.div {...textReveal(0.32)} className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <a
              href={hero.ctaPrimary.href}
              className="group flex h-12 w-full items-center justify-center rounded-full bg-ink px-[22px] text-[15.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#1F2940] sm:w-auto"
            >
              {hero.ctaPrimary.label}
              <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-[3px]" />
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="group flex items-center text-[15.5px] font-semibold text-ink"
            >
              {hero.ctaSecondary.label}
              <ArrowRight size={16} className="ml-1.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
            </a>
          </motion.div>

          <motion.ul {...textReveal(0.4)} className="mt-9 flex list-none flex-wrap items-center gap-x-3 gap-y-2 p-0 text-[13.5px] font-medium text-ink-soft">
            {hero.trust.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-muted" aria-hidden="true" />}
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="lg:col-span-6">
          <div className="hero-stack-scale relative mx-auto h-[440px] w-full max-w-[420px] lg:h-[540px] lg:max-w-none">
            <motion.div style={{ rotateX: reduced ? 0 : scrollRotX, transformStyle: 'preserve-3d' }} className="absolute inset-0">
              <motion.div style={{ transform: reduced ? undefined : tilt, transformStyle: 'preserve-3d' }} className="absolute inset-0">
                <motion.div
                  {...panelReveal(0.2)}
                  className="absolute left-[6%] top-[96px] w-[min(440px,94%)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div style={{ y: reduced ? 0 : yA, transformStyle: 'preserve-3d' }}>
                    <div className="animate-bob" style={{ animationDuration: '7s' }}>
                      <HeroOverviewPanel />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  {...panelReveal(0.45)}
                  className="absolute right-0 top-[24px] w-[250px]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div style={{ y: reduced ? 0 : yB, transformStyle: 'preserve-3d' }}>
                    <div style={{ transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}>
                      <div className="animate-bob" style={{ animationDuration: '6s', animationDelay: '1.2s' }}>
                        <StackPanel />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  {...panelReveal(0.65)}
                  className="absolute left-0 top-[392px] w-[min(300px,94%)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div style={{ y: reduced ? 0 : yC, transformStyle: 'preserve-3d' }}>
                    <div style={{ transform: 'translateZ(130px)', transformStyle: 'preserve-3d' }}>
                      <div className="animate-bob" style={{ animationDuration: '8s', animationDelay: '2.4s' }}>
                        <ArticleToast />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0 z-[5] h-[72px] w-full md:h-[160px]"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 56 C 360 150, 1080 150, 1440 56 L1440 160 L0 160 Z" fill="#FBFAF8" />
      </svg>
    </section>
  );
}
