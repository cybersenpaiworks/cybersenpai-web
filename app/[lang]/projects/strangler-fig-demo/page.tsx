import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '../../../../components/layout/Footer';
import Header from '../../../../components/layout/Header';
import { getDictionary } from '../../../../getDictionary';
import type { Locale } from '../../../../i18n';
import { getPageMetadata } from '../../../../siteMetadata';

const liveDemoUrl = 'https://strangler.cybersenpaiworks.com.br';
const repositoryUrl = 'https://github.com/cybersenpaiworks/research-room-strangler-demo';
const visualAssets = [
  {
    src: '/projects/strangler/browser-validation.png',
    width: 1440,
    height: 2200,
  },
  {
    src: '/projects/strangler/browser-cutover-legacy.png',
    width: 1440,
    height: 2400,
  },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return getPageMetadata({
    locale: lang,
    pathname: 'projects/strangler-fig-demo',
    title: `${dict.stranglerCase.title} | ${dict.stranglerCase.eyebrow}`,
    description: dict.stranglerCase.summary,
    keywords: ['Strangler Fig', 'PHP/Yii', 'Node.js', 'Next.js', 'Socket.IO', 'nginx'],
  });
}

export default async function StranglerFigCasePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(5,11,22,0.98),rgba(7,14,26,0.98))] text-slate-100 selection:bg-cyan-500 selection:text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_14%_14%,rgba(34,211,238,0.14),transparent_0,transparent_28%),radial-gradient(circle_at_82%_8%,rgba(245,158,11,0.14),transparent_0,transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.65),transparent_88%)]" />

      <Header lang={lang} dict={dict} />

      <main className="relative">
        <section className="container mx-auto px-6 pb-16 pt-14 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-6xl">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400"
            >
              <span aria-hidden="true">←</span>
              {dict.stranglerCase.backToHome}
            </Link>

            <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-stretch">
              <div className="relative flex h-full flex-col overflow-hidden rounded-[2.4rem] border border-slate-800/80 bg-[linear-gradient(180deg,rgba(8,17,32,0.92),rgba(8,17,32,0.76))] p-8 shadow-[0_30px_100px_rgba(2,6,23,0.38)] md:p-10 lg:p-12">
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <p className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  {dict.stranglerCase.eyebrow}
                </p>
                <h1 className="mt-8 bg-gradient-to-b from-white via-slate-100 to-cyan-100 bg-clip-text text-5xl font-black leading-[0.98] text-transparent md:text-7xl">
                  {dict.stranglerCase.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                  {dict.stranglerCase.summary}
                </p>

                <div className="mt-10 grid gap-4 sm:auto-rows-fr sm:grid-cols-2">
                  {dict.stranglerCase.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex h-full flex-col rounded-[1.6rem] border border-slate-800 bg-slate-900/65 p-5"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        {fact.label}
                      </p>
                      <p className="mt-3 text-lg font-bold text-cyan-300">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="flex h-full flex-col rounded-[2.25rem] border border-slate-800 bg-slate-900/75 p-8 shadow-[0_24px_70px_rgba(2,6,23,0.36)]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  {dict.stranglerCase.statusLabel}
                </p>
                <p className="mt-3 text-2xl font-bold text-white">
                  {dict.stranglerCase.statusValue}
                </p>

                <div className="mt-8 rounded-[1.7rem] border border-slate-800 bg-slate-800/55 p-6">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                    {dict.stranglerCase.proofTitle}
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {dict.stranglerCase.proofItems.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
                  {dict.stranglerCase.visualsEyebrow}
                </p>
                <h2 className="text-4xl font-black md:text-5xl">{dict.stranglerCase.visualsTitle}</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">
                  {dict.stranglerCase.visualsSubtitle}
                </p>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                {dict.stranglerCase.visuals.map((visual, index) => (
                  <article
                    key={visual.title}
                    className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/70 shadow-[0_22px_60px_rgba(2,6,23,0.24)]"
                  >
                    <div className="flex items-start justify-between gap-4 p-6">
                      <div className="max-w-xl">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                          0{index + 1}
                        </p>
                        <h3 className="mt-4 text-2xl font-bold text-white">{visual.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300">
                          {visual.description}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 bg-slate-950/40 p-3">
                      <div className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950">
                        <Image
                          src={visualAssets[index].src}
                          alt={visual.alt}
                          width={visualAssets[index].width}
                          height={visualAssets[index].height}
                          className="h-auto w-full"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-800/80 bg-slate-900/45 py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)] xl:items-stretch">
              <div className="grid gap-6 auto-rows-fr">
                <article className="flex h-full flex-col rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-[0_22px_60px_rgba(2,6,23,0.24)]">
                  <h2 className="text-2xl font-bold text-white">{dict.stranglerCase.overviewTitle}</h2>
                  <p className="mt-5 text-base leading-relaxed text-slate-300">
                    {dict.stranglerCase.overviewBody}
                  </p>
                </article>

                <article className="flex h-full flex-col rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-[0_22px_60px_rgba(2,6,23,0.24)]">
                  <h2 className="text-2xl font-bold text-white">{dict.stranglerCase.problemTitle}</h2>
                  <p className="mt-5 text-base leading-relaxed text-slate-300">
                    {dict.stranglerCase.problemBody}
                  </p>
                </article>
              </div>

              <div className="grid gap-6 auto-rows-fr">
                <article className="flex h-full flex-col rounded-[2rem] border border-slate-800 bg-slate-900/75 p-8 shadow-[0_24px_70px_rgba(2,6,23,0.32)]">
                  <h2 className="text-2xl font-bold text-white">{dict.stranglerCase.technicalTitle}</h2>
                  <ul className="mt-6 space-y-4">
                    {dict.stranglerCase.technical.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="flex h-full flex-col rounded-[2rem] border border-slate-800 bg-slate-900/75 p-8 shadow-[0_24px_70px_rgba(2,6,23,0.32)]">
                  <h2 className="text-2xl font-bold text-white">{dict.stranglerCase.operationsTitle}</h2>
                  <ul className="mt-6 space-y-4">
                    {dict.stranglerCase.operations.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-slate-800 bg-[linear-gradient(180deg,rgba(9,18,35,0.96),rgba(12,22,40,0.78))] p-8 shadow-[0_30px_90px_rgba(2,6,23,0.35)] md:p-10">
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
                    {dict.stranglerCase.ctaEyebrow}
                  </p>
                  <h2 className="mt-4 text-3xl font-black text-white">{dict.stranglerCase.ctaTitle}</h2>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">
                    {dict.stranglerCase.ctaBody}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
                  <a
                    href={liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-cyan-300"
                  >
                    {dict.stranglerCase.liveDemoButton}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href={repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-500 hover:text-white"
                  >
                    {dict.stranglerCase.repoButton}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} />
    </div>
  );
}
