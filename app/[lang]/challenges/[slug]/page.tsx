import type { Metadata } from 'next';
import { getDictionary } from '../../../../getDictionary';
import { getBuildInfo } from '../../../../getBuildInfo';
import type { Locale } from '../../../../i18n';
import { getPageMetadata } from '../../../../siteMetadata';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import { getImplementedChallengeBySlug } from '../../../../data/implementedChallenges';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChallengeRenderer from '../../../../components/ChallengeRenderer';
import ChallengeArchitecture from '../../../../components/ChallengeArchitecture';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale, slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const challenge = getImplementedChallengeBySlug(slug);

  if (!challenge) {
    return getPageMetadata({
      locale: lang,
      pathname: 'challenges',
      title: dict.challenges.title,
      description: dict.challenges.subtitle,
    });
  }

  return getPageMetadata({
    locale: lang,
    pathname: `challenges/${challenge.slug}`,
    title: `${challenge.title} | ${dict.challenges.title}`,
    description: challenge.summary[lang],
    keywords: [...challenge.keywords, ...challenge.tags],
  });
}

export default async function ChallengeDetailPage({
  params
}: {
  params: Promise<{ lang: Locale, slug: string }>
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const buildInfo = getBuildInfo(lang);

  const challenge = getImplementedChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white scroll-smooth flex flex-col">
      <Header lang={lang} dict={dict} />

      <main className="container mx-auto px-6 py-12 flex-grow">
        <Link href={`/${lang}/challenges`} className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-cyan-400 mb-8 transition-colors">
          ← {dict.challenges.backToGrid}
        </Link>
        
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-cyan-500 font-mono text-2xl font-bold">#{challenge.id.toString().padStart(3, '0')}</span>
            <h1 className="text-3xl md:text-5xl font-extrabold">{challenge.title}</h1>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <ChallengeRenderer challenge={challenge} dict={dict} />
          <ChallengeArchitecture dict={dict} buildInfo={buildInfo} />
        </div>
      </main>

      <Footer dict={dict} />
    </div>
  );
}
