import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import Prose from '../components/Prose';
import InlineVideo from '../components/InlineVideo';
import { featureTabs, projects, site } from '../content';
import type { ProjectTab } from '../content';
import { CSS_FALLBACK_BACKGROUND } from '../gl/mesh';

const ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProjectDetail({ project }: { project: ProjectTab }) {
  const index = projects.findIndex((item) => item.id === project.id);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  useEffect(() => {
    const previous = document.title;
    document.title = `${project.title} · ${site.name}`;
    return () => {
      document.title = previous;
    };
  }, [project.title]);

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-[124px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[460px] opacity-60"
          style={{
            backgroundColor: '#FFF1E4',
            backgroundImage: CSS_FALLBACK_BACKGROUND,
            maskImage: 'linear-gradient(#000 30%, transparent)',
            WebkitMaskImage: 'linear-gradient(#000 30%, transparent)',
          }}
        />
        <div className="relative mx-auto w-full max-w-container px-6">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: ENTRANCE }}
            aria-label="面包屑导航"
            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-muted"
          >
            <a href="/#projects" className="transition-colors duration-150 hover:text-iris">
              项目
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-ink-soft">/projects/{project.id}/</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: ENTRANCE }}
            className="mt-6 max-w-[760px]"
          >
            <span className="inline-flex h-8 items-center rounded-full border border-[rgba(255,255,255,0.8)] bg-white/55 px-4 text-[13px] font-medium text-ink backdrop-blur-xl">
              {project.role} · {project.date.slice(0, 4)}
            </span>
            <h1 className="mt-5 font-display text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[560px] text-[18px] leading-[1.6] text-ink-soft">
              {project.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-iris-tint px-3 py-1 text-[12.5px] font-semibold text-iris"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center rounded-full bg-ink px-5 text-[14.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#1F2940]"
                >
                  {featureTabs.demoLabel}
                  <ExternalLink size={15} className="ml-2" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center rounded-full border border-line bg-white/70 px-5 text-[14.5px] font-semibold text-ink transition-all duration-200 hover:-translate-y-px hover:bg-white"
                >
                  {featureTabs.repoLabel}
                  <ExternalLink size={15} className="ml-2" />
                </a>
              )}
              <a
                href="/#projects"
                className="flex h-11 items-center rounded-full border border-line bg-white/70 px-5 text-[14.5px] font-semibold text-ink transition-all duration-200 hover:-translate-y-px hover:bg-white"
              >
                <ArrowLeft size={15} className="mr-2" />
                返回项目区
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {project.video && (
        <section className="pb-4">
          <div className="mx-auto w-full max-w-container px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: ENTRANCE }}
              className="mx-auto max-w-[960px]"
            >
              <p className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-iris">
                Demo
              </p>
              <InlineVideo
                src={project.video.src}
                poster={project.video.poster}
                title={project.title}
              />
            </motion.div>
          </div>
        </section>
      )}

      <section className="pb-24 pt-14">
        <div className="mx-auto grid w-full max-w-container gap-14 px-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="glass rounded-panel p-5">
              <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Highlights
              </p>
              <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-ink-soft">
                    <Check size={15} className="mt-0.5 shrink-0 text-iris" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="my-4 h-px bg-line" />
              <dl className="m-0 flex flex-col gap-2 font-mono text-[11.5px] text-muted">
                <div className="flex justify-between gap-3">
                  <dt>更新</dt>
                  <dd className="m-0 text-ink-soft tnum">{project.updated}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>职责</dt>
                  <dd className="m-0 text-ink-soft">{project.role}</dd>
                </div>
              </dl>
            </div>
          </aside>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: ENTRANCE }}
            className="max-w-[720px] min-w-0"
          >
            <Prose blocks={project.body} />

            <nav aria-label="项目导航" className="mt-14 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <a
                  href={`/projects/${prev.id}/`}
                  className="rounded-[20px] border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    ← 上一个项目
                  </span>
                  <span className="mt-2 block font-display text-[15px] font-semibold leading-[1.45] text-ink">
                    {prev.title}
                  </span>
                </a>
              ) : (
                <span />
              )}
              {next && (
                <a
                  href={`/projects/${next.id}/`}
                  className="rounded-[20px] border border-line bg-white p-5 text-right transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    下一个项目 →
                  </span>
                  <span className="mt-2 block font-display text-[15px] font-semibold leading-[1.45] text-ink">
                    {next.title}
                  </span>
                </a>
              )}
            </nav>

            <div className="mt-10 flex justify-end">
              <a
                href="/#projects"
                className="flex h-10 items-center gap-2 rounded-full border border-line bg-white/70 px-4 text-[13px] font-semibold text-ink transition-all duration-200 hover:-translate-y-px hover:bg-white"
              >
                回到项目区
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
