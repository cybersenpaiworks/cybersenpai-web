import type { Dictionary } from '../../dictionary';

export default function Footer({ dict }: { dict: Dictionary }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="container mx-auto px-6 pb-16 pt-6">
      <div className="overflow-hidden rounded-[2.5rem] border border-slate-800 bg-[linear-gradient(180deg,rgba(10,18,34,0.96),rgba(7,13,25,0.88))] shadow-[0_30px_90px_rgba(2,6,23,0.45)]">
        <div className="grid gap-8 px-8 py-10 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">{dict.footer.eyebrow}</p>
            <h2 className="mb-4 text-3xl font-black md:text-4xl">{dict.footer.title}</h2>
            <p className="mb-4 max-w-2xl text-slate-300">{dict.footer.subtitle}</p>
            <p className="text-sm font-medium text-slate-400">{dict.footer.availability}</p>
          </div>

          <div className="flex w-full max-w-[360px] flex-col items-start gap-4 rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5 lg:justify-self-end lg:items-end lg:text-right">
            <a href={`mailto:${dict.footer.email}`} className="inline-block text-base font-bold text-cyan-400 transition-all hover:-translate-y-1 hover:text-cyan-300 md:text-lg lg:whitespace-nowrap">
              {dict.footer.email}
            </a>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <a
                href="https://github.com/cybersenpaiworks"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-r-vancini"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-500/60 hover:text-cyan-400"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 px-8 py-5 text-center text-sm text-slate-600 md:px-10">
          &copy; {currentYear} {dict.footer.rights} <br />
          {dict.footer.location}
        </div>
      </div>
    </footer>
  );
}
