import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  pt: () => import('./dictionaries/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  const safeLocale = locale as keyof typeof dictionaries;
  return dictionaries[safeLocale] ? dictionaries[safeLocale]() : dictionaries.pt();
}