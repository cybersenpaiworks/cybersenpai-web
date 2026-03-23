import { getDictionary } from '../../../getDictionary';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ChallengeCard from '../../../components/ChallengeCard';
import { challenges } from '../../../data/challenges';

export default async function ChallengesPage({
  params
}: {
  params: Promise<{ lang: 'pt' | 'en' }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white scroll-smooth">
      <Header lang={lang} dict={dict} />

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {dict.challenges.title}
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            {dict.challenges.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} lang={lang} dict={dict} />
          ))}
        </div>
      </main>

      <Footer dict={dict} />
    </div>
  );
}