import type { Metadata } from 'next';

import {
  defaultLocale,
  localeLanguageTags,
  localeOpenGraphTags,
  locales,
  type Locale,
} from './i18n';

const siteUrl = new URL(
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://cybersenpaiworks.com.br'
);

const siteName = 'Cyber Senpai Works';

const siteMetadata: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  pt: {
    title: 'Cyber Senpai Works | Desenvolvimento e DevOps',
    description:
      'Estúdio de desenvolvimento Full Stack focado em soluções web, mobile e infraestrutura em nuvem por Gabriel Vancini.',
    keywords: [
      'Desenvolvedor Web',
      'Full Stack',
      'Next.js',
      'PHP',
      'DevOps',
      'Freelancer',
      'Santo André',
    ],
  },
  en: {
    title: 'Cyber Senpai Works | Full Stack Development and DevOps',
    description:
      'Full Stack development studio focused on web, mobile, and cloud infrastructure solutions by Gabriel Vancini.',
    keywords: [
      'Web Developer',
      'Full Stack',
      'Next.js',
      'PHP',
      'DevOps',
      'Freelancer',
      'Santo André',
    ],
  },
};

function normalizePathname(pathname = ''): string {
  const normalizedPath = pathname.trim().replace(/^\/+|\/+$/g, '');
  return normalizedPath ? `/${normalizedPath}` : '';
}

function getLocaleMetadata(locale: Locale) {
  return siteMetadata[locale] ?? siteMetadata[defaultLocale];
}

function getPageTitle(locale: Locale, title?: string): string {
  if (!title) {
    return getLocaleMetadata(locale).title;
  }

  return `${title} | ${siteName}`;
}

export function getSiteUrl(): URL {
  return siteUrl;
}

export function getLocalizedPath(locale: Locale, pathname = ''): string {
  return `/${locale}${normalizePathname(pathname)}`;
}

export function getLocalizedUrl(locale: Locale, pathname = ''): string {
  return new URL(getLocalizedPath(locale, pathname), siteUrl).toString();
}

export function getAlternateLanguageUrls(pathname = ''): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [localeLanguageTags[locale], getLocalizedUrl(locale, pathname)])
  );
}

export function getPageMetadata({
  locale,
  pathname = '',
  title,
  description,
  keywords = [],
}: {
  locale: Locale;
  pathname?: string;
  title?: string;
  description?: string;
  keywords?: string[];
}): Metadata {
  const metadata = getLocaleMetadata(locale);
  const resolvedTitle = getPageTitle(locale, title);
  const resolvedDescription = description ?? metadata.description;
  const resolvedKeywords = [...new Set([...metadata.keywords, ...keywords])];
  const localizedUrl = getLocalizedUrl(locale, pathname);

  return {
    metadataBase: siteUrl,
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: resolvedKeywords,
    alternates: {
      canonical: localizedUrl,
      languages: getAlternateLanguageUrls(pathname),
    },
    openGraph: {
      type: 'website',
      siteName,
      title: resolvedTitle,
      description: resolvedDescription,
      url: localizedUrl,
      locale: localeOpenGraphTags[locale],
      alternateLocale: locales
        .filter((availableLocale) => availableLocale !== locale)
        .map((availableLocale) => localeOpenGraphTags[availableLocale]),
      images: [
        {
          url: '/icon.svg',
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: resolvedTitle,
      description: resolvedDescription,
      images: ['/icon.svg'],
    },
  };
}

export function getSiteMetadata(locale: Locale): Metadata {
  return getPageMetadata({ locale });
}
