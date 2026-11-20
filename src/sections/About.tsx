import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { about, site } from '../content';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function About() {
  return (
    <section id="about" className="py-[88px] md:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ENTRANCE }}
          className="max-w-[640px]"
        >
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-iris">{about.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(34px,4vw,56px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            {about.h2}
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 1 玻璃 profile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: ENTRANCE }}
            className="glass rounded-frame p-6 md:p-8"
          >
            <div
              className="grid h-16 w-16 place-items-center rounded-[16px] font-display text-[24px] font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #FF9E7A, #B39DFF, #8FD3FF)' }}
              aria-hidden="true"
            >
              {site.monogram}
            </div>
            <h3 className="m-0 mt-5 font-display text-[22px] font-semibold tracking-[-0.015em] text-ink">{site.name}</h3>
            <p className="m-0 mt-1 text-[14px] text-muted">{site.role}</p>
            <dl className="m-0 mt-6">
              {about.profile.facts.map((fact) => (
                <div key={fact.dt} className="flex items-center justify-between gap-4 border-b border-line/70 py-2.5">
                  <dt className="text-[13px] text-muted">{fact.dt}</dt>
                  <dd className="m-0 text-right text-[14px] font-medium text-ink">
                    {fact.href ? (
                      <a
                        href={fact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-iris hover:underline"
                      >
                        {fact.dd}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      fact.dd
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Card 2 技能组 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.06, ease: ENTRANCE }}
            className="rounded-frame border border-line bg-surface p-6 shadow-card md:p-8"
          >
            <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">技能组</h3>
            <dl className="m-0 mt-6 flex flex-col gap-4">
              {about.skills.map((skill) => (
                <div key={skill.dt} className="flex items-start gap-4">
                  <dt className="w-[72px] shrink-0 pt-px font-mono text-[12px] tracking-[0.04em] text-muted">{skill.dt}</dt>
                  <dd className="m-0 min-w-0 text-[14.5px] leading-[1.6] text-ink-soft">{skill.dd}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Card 3 学习路径 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.12, ease: ENTRANCE }}
            className="rounded-frame border border-line bg-surface p-6 shadow-card md:p-8"
          >
            <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">学习路径</h3>
            <ol className="relative m-0 mt-6 flex list-none flex-col gap-6 p-0 pl-6">
              <span className="absolute bottom-2 left-[3px] top-2 w-px bg-line" aria-hidden="true" />
              {about.timeline.map((item) => (
                <li key={item.time} className="relative">
                  <span className="absolute -left-6 top-1.5 h-2 w-2 rounded-full bg-iris" aria-hidden="true" />
                  <span className="font-mono text-[12px] tracking-[0.04em] text-muted">{item.time}</span>
                  <p className="m-0 mt-1 text-[15px] font-semibold text-ink">{item.title}</p>
                  <p className="m-0 mt-1 text-[14px] leading-[1.65] text-ink-soft">{item.text}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
