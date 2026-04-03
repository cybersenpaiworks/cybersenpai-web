import { type Locale } from './i18n';

export interface BuildInfo {
  buildDate: string;
  commitHash: string;
  runtimeLabel: string;
}

const runtimePlatforms: Record<string, string> = {
  darwin: 'macOS',
  linux: 'Linux',
  win32: 'Windows',
};

export function getBuildInfo(locale: Locale): BuildInfo {
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;
  const languageTag = locale === 'pt' ? 'pt-BR' : 'en-US';
  const buildDate =
    buildTime && !Number.isNaN(Date.parse(buildTime))
      ? new Date(buildTime).toLocaleString(languageTag)
      : '---';

  return {
    buildDate,
    commitHash: process.env.NEXT_PUBLIC_COMMIT_HASH || 'dev',
    runtimeLabel: `Node.js ${process.version} (${runtimePlatforms[process.platform] ?? process.platform})`,
  };
}
