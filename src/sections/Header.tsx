import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from '../components/Logo';
import { nav, site } from '../content';

const SWAP: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[72px] transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? 'border-b border-[rgba(14,21,37,0.06)] bg-[rgba(251,250,248,0.78)] backdrop-blur-[14px] backdrop-saturate-[1.4]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-container items-center px-5 sm:px-6">
        <Logo />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex" aria-label="主导航">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[15px] font-medium text-ink-soft transition-colors duration-150 hover:text-ink lg:inline"
          >
            GitHub ↗
          </a>
          <a
            href="#contact"
            className="flex h-10 items-center rounded-full bg-ink px-[18px] text-[14.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#1F2940]"
          >
            联系我
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? '关闭菜单' : '打开菜单'}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: SWAP }}
            className="absolute inset-x-0 top-[72px] overflow-hidden border-b border-[rgba(14,21,37,0.06)] bg-[rgba(251,250,248,0.96)] backdrop-blur-[14px] lg:hidden"
          >
            <div className="flex flex-col gap-5 p-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: SWAP }}
                  onClick={() => setOpen(false)}
                  className="font-display text-[24px] font-semibold text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + nav.length * 0.04, ease: SWAP }}
                onClick={() => setOpen(false)}
                className="font-display text-[24px] font-semibold text-ink"
              >
                GitHub ↗
              </motion.a>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + (nav.length + 1) * 0.04, ease: SWAP }}
                onClick={() => setOpen(false)}
                className="mt-2 flex h-12 items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white"
              >
                联系我
                <ArrowRight size={16} className="ml-2" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
