import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

import type { ImplementedChallengeId } from '../../data/implementedChallenges';

function LoadingChallenge() {
  return (
    <div className="flex h-[600px] w-full flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center animate-pulse md:h-[700px]">
      <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      <p className="font-mono text-sm text-slate-400">Loading Challenge...</p>
    </div>
  );
}

export const challengeComponents = {
  1: dynamic(() => import('./001-Starfield'), {
    ssr: false,
    loading: LoadingChallenge,
  }),
  2: dynamic(() => import('./002-MengerSponge'), {
    ssr: false,
    loading: LoadingChallenge,
  }),
} satisfies Record<ImplementedChallengeId, ComponentType>;
