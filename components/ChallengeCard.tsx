import Link from 'next/link';
import { Challenge } from '../data/challenges';

export default function ChallengeCard({ challenge, lang, dict }: { challenge: Challenge, lang: string, dict: Record<string, Record<string, string>> }) {
  if (challenge.implemented) {
    return (
      <Link href={`/${lang}/challenges/${challenge.slug}`} className="group block bg-slate-800/50 rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <span className="text-cyan-400 font-mono text-sm">#{challenge.id.toString().padStart(3, '0')}</span>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">{dict.challenges.statusImplemented}</span>
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{challenge.title}</h3>
      </Link>
    );
  }

  return (
    <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 opacity-70 cursor-not-allowed">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-500 font-mono text-sm">#{challenge.id.toString().padStart(3, '0')}</span>
        <span className="bg-slate-700 text-slate-400 text-xs font-bold px-2 py-1 rounded">{dict.challenges.statusSoon}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-300">{challenge.title}</h3>
    </div>
  );
}