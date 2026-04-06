import type { Metadata } from 'next';

import { getDictionary } from '../../../getDictionary';
import type { Locale } from '../../../i18n';
import { getPageMetadata } from '../../../siteMetadata';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ChallengeCard from '../../../components/ChallengeCard';
import { challenges } from '../../../data/challenges';
import { listedImplementedChallengeIds } from '../../../data/implementedChallenges';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return getPageMetadata({
    locale: lang,
    pathname: 'challenges',
    title: dict.challenges.title,
    description: dict.challenges.subtitle,
    keywords: ['HTML5 Canvas', 'TypeScript', 'The Coding Train'],
  });
}

export default async function ChallengesPage({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const publishedChallenges = challenges.filter(
    (challenge) => challenge.implemented && listedImplementedChallengeIds.has(challenge.id)
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white scroll-smooth">
      <Header lang={lang} dict={dict} />

      <main className="container mx-auto px-6 py-20">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">
            {dict.lab.eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-extrabold md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {dict.challenges.title}
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300">
            {dict.challenges.subtitle}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">
            {dict.challenges.intro}
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-800 bg-slate-800/60 px-5 py-3 text-sm font-medium text-slate-300">
            <span className="text-cyan-400">{dict.challenges.implementedLabel}</span>
            <span className="font-mono text-white">{publishedChallenges.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:auto-rows-fr md:grid-cols-2">
          {publishedChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} lang={lang} dict={dict} />
          ))}
        </div>
      </main>

      <Footer dict={dict} />
    </div>
  );
}
