import { getDictionary } from '../../../../getDictionary';
import Header from '../../../../components/layout/Header';
import Footer from '../../../../components/layout/Footer';
import { challenges } from '../../../../data/challenges';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChallengeRenderer from '../../../../components/ChallengeRenderer';
import ChallengeArchitecture from '../../../../components/ChallengeArchitecture';

export default async function ChallengeDetailPage({
  params
}: {
  params: Promise<{ lang: 'pt' | 'en', slug: string }>
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const challenge = challenges.find(c => c.slug === slug);

  // Se não existir ou não estiver implementado, retorna 404
  if (!challenge || !challenge.implemented) {
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
          <ChallengeRenderer id={challenge.id} videoUrl={challenge.videoUrl} dict={dict} lang={lang} />
          <ChallengeArchitecture dict={dict} lang={lang} />
        </div>
      </main>

      <Footer dict={dict} />
    </div>
  );
}