import syncedChallengesData from './challenges.json';
import { getImplementedChallengeById } from './implementedChallenges';

export interface Challenge {
  id: number;
  title: string;
  slug: string;
  implemented: boolean;
  videoUrl?: string;
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
    implemented: true,
  };
});
