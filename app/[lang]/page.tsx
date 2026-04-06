import type { Metadata } from 'next';
import Link from 'next/link';

import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { getDictionary } from '../../getDictionary';
import type { Locale } from '../../i18n';
import { getPageMetadata } from '../../siteMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params;

  return getPageMetadata({ locale: lang });
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(5,11,22,0.98),rgba(7,14,26,0.98))] text-slate-100 selection:bg-cyan-500 selection:text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_0,transparent_34%),radial-gradient(circle_at_82%_12%,rgba(59,130,246,0.24),transparent_0,transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[46rem] h-[34rem] bg-[radial-gradient(circle_at_72%_30%,rgba(245,158,11,0.09),transparent_0,transparent_24%),radial-gradient(circle_at_24%_76%,rgba(34,211,238,0.08),transparent_0,transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.55),transparent_88%)]" />

      <Header lang={lang} dict={dict} />

      <main className="relative">
        <section className="container mx-auto px-6 pb-24 pt-16 md:pb-28 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:items-stretch">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2.6rem] border border-slate-800/80 bg-[linear-gradient(180deg,rgba(8,17,32,0.92),rgba(8,17,32,0.76))] p-8 shadow-[0_30px_100px_rgba(2,6,23,0.38)] md:p-10 lg:p-12">
              <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-cyan-500/12 blur-3xl" />
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
              <p className="relative inline-flex max-w-xl rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                {dict.hero.eyebrow}
              </p>
              <h1 className="relative mt-8 max-w-4xl bg-gradient-to-b from-white via-slate-100 to-cyan-100 bg-clip-text text-5xl font-black leading-[0.98] text-transparent md:text-7xl">
                {dict.hero.title}
              </h1>
              <p className="relative mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                {dict.hero.subtitle}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:mt-auto sm:flex-row sm:pt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-8 py-3 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  {dict.hero.primaryCta}
                  <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href={`/${lang}/projects/climatempo`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-8 py-3 text-sm font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-500 hover:text-white"
                >
                  {dict.hero.secondaryCta}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            <aside className="relative flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-slate-800 bg-slate-900/70 p-6 shadow-[0_30px_90px_rgba(2,6,23,0.45)]">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{dict.proof.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{dict.proof.subtitle}</p>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                  {dict.proof.status}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4">
                {dict.proof.items.map((item, index) => (
                  <div
                    key={item.value}
                    className="flex-1 rounded-[1.4rem] border border-slate-800 bg-[linear-gradient(180deg,rgba(15,23,42,0.86),rgba(8,15,30,0.86))] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                          0{index + 1}
                        </p>
                        <p className="mt-3 text-2xl font-black text-cyan-400">{item.value}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="projects" className="relative border-y border-slate-800/80 bg-slate-900/45 py-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-500/5 to-transparent" />
          <div className="container mx-auto px-6">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
                  {dict.projects.eyebrow}
                </p>
                <h2 className="text-4xl font-black md:text-5xl">{dict.projects.title}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
                  {dict.projects.lead}
                </p>
              </div>
              <div className="self-start rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 md:mt-1">
                {dict.projects.badge}
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] xl:items-stretch">
              <article className="relative flex h-full flex-col overflow-hidden rounded-[2.4rem] border border-slate-700 bg-[linear-gradient(180deg,rgba(11,23,45,0.94),rgba(8,16,31,0.96))] p-8 shadow-[0_30px_100px_rgba(2,6,23,0.45)] md:p-10">
                <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                <div className="relative flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                    {dict.projects.primaryTitle}
                  </span>
                  <span className="text-sm font-medium text-slate-400">{dict.projects.primaryRole}</span>
                </div>

                <p className="relative mt-6 max-w-3xl text-xl leading-relaxed text-slate-100">
                  {dict.projects.primarySummary}
                </p>

                <div className="relative mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.7rem] border border-slate-800 bg-slate-800/55 p-6 md:col-span-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      {dict.projects.contextTitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {dict.projects.contextBody}
                    </p>
                  </div>

                  <div className="rounded-[1.7rem] border border-slate-800 bg-slate-800/55 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      {dict.projects.responsibilitiesTitle}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {dict.projects.responsibilitiesItems.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.7rem] border border-slate-800 bg-slate-800/55 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      {dict.projects.technicalTitle}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {dict.projects.technicalItems.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative mt-8">
                  <Link
                    href={`/${lang}/projects/climatempo`}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-200"
                  >
                    {dict.projects.caseCta}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>

              <div className="grid gap-6 auto-rows-fr">
                <aside className="flex h-full flex-col rounded-[2rem] border border-slate-800 bg-slate-900/75 p-8 shadow-[0_24px_70px_rgba(2,6,23,0.32)]">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{dict.projects.impactEyebrow}</p>
                  <h3 className="mt-3 text-2xl font-bold text-white">{dict.projects.impactTitle}</h3>
                  <ul className="mt-6 space-y-4">
                    {dict.projects.impactItems.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>

                <aside className="flex h-full flex-col rounded-[2rem] border border-amber-500/15 bg-[linear-gradient(180deg,rgba(36,22,6,0.24),rgba(15,23,42,0.48))] p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300/80">
                    {dict.projects.secondaryEyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-white">{dict.projects.secondaryTitle}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {dict.projects.secondarySummary}
                  </p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/${lang}/projects/strangler-fig-demo`}
                      className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-100"
                    >
                      {dict.projects.secondaryCta}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
                {dict.services.eyebrow}
              </p>
              <h2 className="text-4xl font-black md:text-5xl">{dict.services.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                {dict.services.subtitle}
              </p>
            </div>

            <div className="grid gap-6 md:auto-rows-fr md:grid-cols-3">
              {dict.services.items.map((service, index) => (
                <article
                  key={service.title}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_26px_80px_rgba(8,145,178,0.12)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-white">{service.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{service.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-800/80 bg-slate-900/45 py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
                {dict.process.eyebrow}
              </p>
              <h2 className="text-4xl font-black md:text-5xl">{dict.process.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                {dict.process.subtitle}
              </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] xl:items-stretch">
              <div className="grid gap-5 md:auto-rows-fr md:grid-cols-2">
                {dict.process.steps.map((step, index) => (
                  <article key={step.title} className="flex h-full flex-col rounded-[2rem] border border-slate-800 bg-slate-900/70 p-7 shadow-[0_22px_60px_rgba(2,6,23,0.24)]">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-bold text-cyan-300">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className="grid gap-6 auto-rows-fr">
                <aside className="flex h-full flex-col rounded-[2rem] border border-slate-800 bg-slate-900/75 p-8">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                    {dict.process.principlesTitle}
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {dict.process.principles.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>

                <aside className="flex h-full flex-col rounded-[2rem] border border-amber-500/15 bg-[linear-gradient(180deg,rgba(36,22,6,0.24),rgba(15,23,42,0.48))] p-8">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200/85">
                    {dict.process.fitTitle}
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {dict.process.fitItems.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] xl:items-stretch">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
                  {dict.about.eyebrow}
                </p>
                <h2 className="text-4xl font-black md:text-5xl">{dict.about.title}</h2>
                <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-slate-300">
                  {dict.about.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <aside className="flex h-full flex-col rounded-[2rem] border border-slate-800 bg-slate-900/75 p-8 shadow-[0_24px_70px_rgba(2,6,23,0.24)]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{dict.about.cardEyebrow}</p>
                <h3 className="mt-3 text-2xl font-bold text-white">Cyber Senpai Works</h3>
                <ul className="mt-6 space-y-4">
                  {dict.about.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-4 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="rounded-[2.5rem] border border-slate-800 bg-[linear-gradient(180deg,rgba(9,18,35,0.94),rgba(12,22,40,0.78))] px-8 py-12 shadow-[0_30px_90px_rgba(2,6,23,0.35)] md:px-10">
              <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
                    {dict.lab.eyebrow}
                  </p>
                  <h2 className="text-4xl font-black md:text-5xl">{dict.lab.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate-300">
                    {dict.lab.subtitle}
                  </p>
                </div>

                <div className="xl:pb-1">
                  <Link
                    href={`/${lang}/challenges`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/50 bg-amber-500/10 px-8 py-3 text-sm font-semibold text-amber-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-100"
                  >
                    {dict.lab.cta}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="grid gap-6 md:auto-rows-fr md:grid-cols-2">
                {dict.lab.cards.map((card) => (
                  <article key={card.title} className="flex h-full flex-col rounded-[1.8rem] border border-slate-800 bg-slate-900/70 p-7">
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} />
    </div>
  );
}
