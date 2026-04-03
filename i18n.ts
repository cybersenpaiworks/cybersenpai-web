export const locales = ['pt', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

export const localeLanguageTags: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
};

export const localeOpenGraphTags: Record<Locale, string> = {
  pt: 'pt_BR',
  en: 'en_US',
};

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
