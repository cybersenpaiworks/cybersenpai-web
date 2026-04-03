import { describe, expect, it } from 'vitest';

import { challenges } from '../challenges';
import { implementedChallenges } from '../implementedChallenges';

describe('challenge catalog', () => {
  it('marks implemented challenges from the registry', () => {
    const implementedIds = implementedChallenges.map((challenge) => challenge.id);

    expect(
      challenges.filter((challenge) => challenge.implemented).map((challenge) => challenge.id)
    ).toEqual(implementedIds);
  });

  it('overrides implemented challenge metadata with the registry values', () => {
    for (const implementedChallenge of implementedChallenges) {
      const catalogChallenge = challenges.find(
        (challenge) => challenge.id === implementedChallenge.id
      );

      expect(catalogChallenge).toMatchObject({
        id: implementedChallenge.id,
        title: implementedChallenge.title,
        slug: implementedChallenge.slug,
        videoUrl: implementedChallenge.videoUrl,
        implemented: true,
      });
    }
  });
});
