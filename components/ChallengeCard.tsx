import Link from 'next/link';
import { Challenge } from '../data/challenges';
import type { Dictionary } from '../dictionary';
import type { Locale } from '../i18n';

export default function ChallengeCard({ challenge, lang, dict }: { challenge: Challenge, lang: Locale, dict: Dictionary }) {
  if (challenge.implemented) {
    return (
      <Link href={`/${lang}/challenges/${challenge.slug}`} className="group flex h-full min-h-[16rem] flex-col rounded-[1.6rem] border border-cyan-500/30 bg-slate-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-slate-800">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="text-cyan-400 font-mono text-sm">#{challenge.id.toString().padStart(3, '0')}</span>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">{dict.challenges.statusImplemented}</span>
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{challenge.title}</h3>
        {challenge.summary?.[lang] ? (
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {challenge.summary[lang]}
          </p>
        ) : null}
        {challenge.tags?.length ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {challenge.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </Link>
    );
  }

  return (
    <div className="flex h-full min-h-[16rem] cursor-not-allowed flex-col rounded-[1.6rem] border border-slate-700/50 bg-slate-800/30 p-6 opacity-70">
      <div className="mb-4 flex items-start justify-between">
        <span className="text-slate-500 font-mono text-sm">#{challenge.id.toString().padStart(3, '0')}</span>
        <span className="bg-slate-700 text-slate-400 text-xs font-bold px-2 py-1 rounded">{dict.challenges.statusSoon}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-300">{challenge.title}</h3>
    </div>
  );
}
