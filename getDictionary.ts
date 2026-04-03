import 'server-only';

import { dictionaries, type Dictionary } from './dictionary';
import { type Locale } from './i18n';

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale];
