import enDictionary from './dictionaries/en.json';
import ptDictionary from './dictionaries/pt.json';
import type { Locale } from './i18n';

export type Dictionary = typeof ptDictionary;

export const dictionaries = {
  en: enDictionary,
  pt: ptDictionary,
} satisfies Record<Locale, Dictionary>;
