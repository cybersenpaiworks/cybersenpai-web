import type { Locale } from '../i18n';

interface ImplementedChallengeDefinition {
  id: number;
  slug: string;
  title: string;
  videoUrl: string;
  summary: Record<Locale, string>;
  keywords: string[];
  tags: string[];
  listed?: boolean;
}

export const implementedChallenges = [
  {
    id: 1,
    slug: '1-starfield',
    title: 'Starfield',
    videoUrl: 'https://www.youtube.com/results?search_query=Coding+Train+Challenge+1',
    summary: {
      pt: 'Simulacao de dobra espacial com Canvas 2D, profundidade procedural e controles de velocidade e densidade.',
      en: 'Warp-speed starfield simulation built with Canvas 2D, procedural depth, and speed and density controls.',
    },
    keywords: ['Starfield', 'Canvas Animation', 'Particles', 'Depth Simulation'],
    tags: ['HTML5 Canvas', 'Animation', 'Particles'],
    listed: true,
  },
  {
    id: 2,
    slug: '2-menger-sponge',
    title: 'Menger Sponge',
    videoUrl: 'https://www.youtube.com/results?search_query=Coding+Train+Challenge+2',
    summary: {
      pt: 'Visualizacao voxel do fractal Menger Sponge com projecao 3D em Canvas, rotacao continua e controle de recursao.',
      en: 'Voxel-based Menger Sponge fractal rendered with a 3D canvas projection, continuous rotation, and recursion controls.',
    },
    keywords: ['Menger Sponge', 'Fractal', 'Voxel', '3D Projection'],
    tags: ['HTML5 Canvas', 'Fractal', '3D'],
    listed: false,
  },
] as const satisfies readonly ImplementedChallengeDefinition[];

export type ImplementedChallenge = (typeof implementedChallenges)[number];
export type ImplementedChallengeId = (typeof implementedChallenges)[number]['id'];
export type ImplementedChallengeSlug = (typeof implementedChallenges)[number]['slug'];

const implementedChallengesById = new Map<number, ImplementedChallenge>(
  implementedChallenges.map((challenge) => [challenge.id, challenge])
);

const implementedChallengesBySlug = new Map<string, ImplementedChallenge>(
  implementedChallenges.map((challenge) => [challenge.slug, challenge])
);

export const implementedChallengeIds = new Set<number>(
  implementedChallenges.map((challenge) => challenge.id)
);

export const listedImplementedChallengeIds = new Set<number>(
  implementedChallenges
    .filter((challenge) => challenge.listed !== false)
    .map((challenge) => challenge.id)
);

export function getImplementedChallengeById(id: number) {
  return implementedChallengesById.get(id);
}

export function getImplementedChallengeBySlug(slug: string) {
  return implementedChallengesBySlug.get(slug);
}
