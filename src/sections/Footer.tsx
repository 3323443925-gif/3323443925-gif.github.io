import Logo from '../components/Logo';
import { footer } from '../content';

export default function Footer() {
  return (
    <footer className="border-t border-line pb-10 pt-20">
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 flex flex-col gap-5 md:col-span-5">
            <Logo />
            <p className="m-0 max-w-[300px] text-[15px] leading-[1.6] text-ink-soft">{footer.blurb}</p>
            <span className="flex h-[30px] w-max items-center gap-2 rounded-full border border-line bg-surface px-3 text-[13px] font-medium text-ink">
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-positive" aria-hidden="true" />
              {footer.status}
            </span>
            <p className="m-0 text-[13px] text-muted">{footer.hosting}</p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.heading} className="md:col-span-2" aria-label={col.heading}>
              <h3 className="m-0 text-[13px] font-semibold uppercase tracking-[0.06em] text-ink">{col.heading}</h3>
              <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between">
          <p className="m-0 text-[13px] text-muted">{footer.copyright}</p>
          <a
            href={footer.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted transition-colors duration-150 hover:text-ink"
          >
            {footer.credit.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
