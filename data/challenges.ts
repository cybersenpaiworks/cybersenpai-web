import syncedChallengesData from './challenges.json';
import { getImplementedChallengeById } from './implementedChallenges';
import type { Locale } from '../i18n';

export interface Challenge {
  id: number;
  title: string;
  slug: string;
  implemented: boolean;
  videoUrl?: string;
  summary?: Record<Locale, string>;
  tags?: string[];
}

interface SyncedChallenge {
  id: number;
  title: string;
  slug: string;
  videoUrl?: string;
}

const syncedChallenges = syncedChallengesData as SyncedChallenge[];

export const challenges: Challenge[] = syncedChallenges.map((challenge) => {
  const implementedChallenge = getImplementedChallengeById(challenge.id);

  if (!implementedChallenge) {
    return {
      ...challenge,
      implemented: false,
    };
  }

  return {
    ...challenge,
    title: implementedChallenge.title,
    slug: implementedChallenge.slug,
    videoUrl: implementedChallenge.videoUrl,
    summary: implementedChallenge.summary,
    tags: implementedChallenge.tags,
    implemented: true,
  };
});
