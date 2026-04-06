import type { MetadataRoute } from 'next';

import { implementedChallenges } from '../data/implementedChallenges';
import { locales } from '../i18n';
import {
  getAlternateLanguageUrls,
  getLocalizedUrl,
} from '../siteMetadata';

const buildTimestamp = process.env.NEXT_PUBLIC_BUILD_TIME;
const lastModified =
  buildTimestamp && !Number.isNaN(Date.parse(buildTimestamp))
    ? new Date(buildTimestamp)
    : new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: getLocalizedUrl(locale),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: getAlternateLanguageUrls(),
      },
    });

    entries.push({
      url: getLocalizedUrl(locale, 'challenges'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: getAlternateLanguageUrls('challenges'),
      },
    });

    entries.push({
      url: getLocalizedUrl(locale, 'projects/climatempo'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: getAlternateLanguageUrls('projects/climatempo'),
      },
    });

    entries.push({
      url: getLocalizedUrl(locale, 'projects/strangler-fig-demo'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: getAlternateLanguageUrls('projects/strangler-fig-demo'),
      },
    });

    for (const challenge of implementedChallenges) {
      entries.push({
        url: getLocalizedUrl(locale, `challenges/${challenge.slug}`),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: getAlternateLanguageUrls(`challenges/${challenge.slug}`),
        },
      });
    }
  }

  return entries;
}
