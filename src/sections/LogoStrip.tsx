import { motion, useReducedMotion } from 'motion/react';
import Wordmarks from '../components/Wordmarks';
import { logoStrip } from '../content';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function LogoStrip() {
  const reduced = useReducedMotion();

  return (
    <section className="pb-20 pt-4">
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ENTRANCE }}
          className="text-center text-[14px] font-medium text-muted"
        >
          {logoStrip.caption}
        </motion.p>

        <div className="mt-8">
          {reduced ? (
            <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10">
              {logoStrip.items.map((item) => (
                <Wordmarks key={item} item={item} />
              ))}
            </div>
          ) : (
            <div
              className="marquee-row h-14 w-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
              }}
            >
              <div className="animate-marquee flex h-full w-max items-center">
                <div className="flex h-full items-center gap-12 pr-12 md:gap-[72px] md:pr-[72px]">
                  {logoStrip.items.map((item) => (
                    <Wordmarks key={item} item={item} />
                  ))}
                </div>
                <div aria-hidden="true" className="flex h-full items-center gap-12 pr-12 md:gap-[72px] md:pr-[72px]">
                  {logoStrip.items.map((item) => (
                    <Wordmarks key={`${item}-dup`} item={item} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
