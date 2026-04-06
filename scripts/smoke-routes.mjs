import { spawn } from 'node:child_process';
import { join } from 'node:path';

const host = process.env.SMOKE_HOST || '127.0.0.1';
const port = process.env.SMOKE_PORT || '3100';
const baseUrl = `http://${host}:${port}`;
const serverScript = join(process.cwd(), '.next', 'standalone', 'server.js');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/icon.svg`);
      if (response.ok) {
        return;
      }
    } catch {
      // Server not ready yet.
    }

    await delay(500);
  }

  throw new Error('Timed out while waiting for the Next.js server to start.');
}

async function fetchText(pathname, init) {
  const response = await fetch(`${baseUrl}${pathname}`, init);
  const text = await response.text();
  return { response, text };
}

async function run() {
  let logs = '';

  const server = spawn(
    process.execPath,
    [serverScript],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        HOSTNAME: host,
        PORT: port,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  );

  server.stdout.on('data', (chunk) => {
    logs += chunk.toString();
  });

  server.stderr.on('data', (chunk) => {
    logs += chunk.toString();
  });

  try {
    await waitForServer();

    const rootResponse = await fetch(`${baseUrl}/`, { redirect: 'manual' });
    const rootLocation = rootResponse.headers.get('location') || '';
    assert(
      [307, 308].includes(rootResponse.status) &&
        (rootLocation === '/pt/' || rootLocation === '/pt'),
      `Expected "/" to redirect to "/pt", got status ${rootResponse.status} and location "${rootLocation}".`
    );

    const englishRedirect = await fetch(`${baseUrl}/`, {
      headers: { 'accept-language': 'en-US,en;q=0.9' },
      redirect: 'manual',
    });
    const englishLocation = englishRedirect.headers.get('location') || '';
    assert(
      [307, 308].includes(englishRedirect.status) &&
        (englishLocation === '/en/' || englishLocation === '/en'),
      `Expected English Accept-Language to redirect to "/en", got status ${englishRedirect.status} and location "${englishLocation}".`
    );

    const ptHome = await fetchText('/pt');
    assert(ptHome.response.ok, `Expected "/pt" to return 200, got ${ptHome.response.status}.`);
    assert(ptHome.text.includes('Fale sobre seu projeto'), 'Expected Portuguese home page content to be present.');
    assert(
      ptHome.text.includes('rel="canonical" href="https://cybersenpaiworks.com.br/pt"'),
      'Expected Portuguese home page canonical tag to be present.'
    );
    assert(
      ptHome.text.includes('hrefLang="en-US" href="https://cybersenpaiworks.com.br/en"'),
      'Expected Portuguese home page alternate English hreflang tag to be present.'
    );

    const enHome = await fetchText('/en');
    assert(enHome.response.ok, `Expected "/en" to return 200, got ${enHome.response.status}.`);
    assert(enHome.text.includes('Discuss your project'), 'Expected English home page content to be present.');
    assert(
      enHome.text.includes('<html lang="en">'),
      'Expected English home page to render with lang="en".'
    );
    assert(
      enHome.text.includes('property="og:locale" content="en_US"'),
      'Expected English home page Open Graph locale to be present.'
    );

    const climatempoCase = await fetchText('/pt/projects/climatempo');
    assert(
      climatempoCase.response.ok,
      `Expected "/pt/projects/climatempo" to return 200, got ${climatempoCase.response.status}.`
    );
    assert(
      climatempoCase.text.includes('Climatempo'),
      'Expected Climatempo case study title to be present.'
    );
    assert(
      climatempoCase.text.includes(
        'rel="canonical" href="https://cybersenpaiworks.com.br/pt/projects/climatempo"'
      ),
      'Expected Climatempo case study canonical tag to be present.'
    );

    const stranglerCase = await fetchText('/pt/projects/strangler-fig-demo');
    assert(
      stranglerCase.response.ok,
      `Expected "/pt/projects/strangler-fig-demo" to return 200, got ${stranglerCase.response.status}.`
    );
    assert(
      stranglerCase.text.includes('Strangler Fig Migration Demo'),
      'Expected Strangler case study title to be present.'
    );
    assert(
      stranglerCase.text.includes(
        'rel="canonical" href="https://cybersenpaiworks.com.br/pt/projects/strangler-fig-demo"'
      ),
      'Expected Strangler case study canonical tag to be present.'
    );

    const challengesPage = await fetchText('/pt/challenges');
    assert(
      challengesPage.response.ok,
      `Expected "/pt/challenges" to return 200, got ${challengesPage.response.status}.`
    );
    assert(
      challengesPage.text.includes('Laboratório'),
      'Expected challenges index title to be present.'
    );
    assert(
      !challengesPage.text.includes('Menger Sponge'),
      'Expected hidden second challenge card not to be present in the public lab grid.'
    );
    assert(
      challengesPage.text.includes('rel="canonical" href="https://cybersenpaiworks.com.br/pt/challenges"'),
      'Expected challenges index canonical tag to be present.'
    );

    const challengeDetail = await fetchText('/pt/challenges/1-starfield');
    assert(
      challengeDetail.response.ok,
      `Expected implemented challenge page to return 200, got ${challengeDetail.response.status}.`
    );
    assert(challengeDetail.text.includes('Starfield'), 'Expected challenge detail title to be present.');
    assert(
      challengeDetail.text.includes(
        'rel="canonical" href="https://cybersenpaiworks.com.br/pt/challenges/1-starfield"'
      ),
      'Expected challenge detail canonical tag to be present.'
    );

    const secondChallengeDetail = await fetchText('/pt/challenges/2-menger-sponge');
    assert(
      secondChallengeDetail.response.ok,
      `Expected second implemented challenge page to return 200, got ${secondChallengeDetail.response.status}.`
    );
    assert(
      secondChallengeDetail.text.includes('Menger Sponge'),
      'Expected second challenge detail title to be present.'
    );
    assert(
      secondChallengeDetail.text.includes(
        'rel="canonical" href="https://cybersenpaiworks.com.br/pt/challenges/2-menger-sponge"'
      ),
      'Expected second challenge detail canonical tag to be present.'
    );

    const invalidLocale = await fetch(`${baseUrl}/es/challenges`);
    assert(
      invalidLocale.status === 404,
      `Expected invalid locale route to resolve as 404, got ${invalidLocale.status}.`
    );

    const robots = await fetchText('/robots.txt');
    assert(robots.response.ok, `Expected "/robots.txt" to return 200, got ${robots.response.status}.`);
    assert(robots.text.includes('Sitemap: https://cybersenpaiworks.com.br/sitemap.xml'), 'Expected sitemap entry in robots.txt.');

    const sitemap = await fetchText('/sitemap.xml');
    assert(sitemap.response.ok, `Expected "/sitemap.xml" to return 200, got ${sitemap.response.status}.`);
    assert(
      sitemap.text.includes('https://cybersenpaiworks.com.br/pt/challenges/1-starfield'),
      'Expected implemented challenge URL to be present in sitemap.'
    );
    assert(
      sitemap.text.includes('https://cybersenpaiworks.com.br/pt/challenges/2-menger-sponge'),
      'Expected second implemented challenge URL to be present in sitemap.'
    );
    assert(
      sitemap.text.includes('https://cybersenpaiworks.com.br/pt/projects/climatempo'),
      'Expected Climatempo case study URL to be present in sitemap.'
    );
    assert(
      sitemap.text.includes('https://cybersenpaiworks.com.br/pt/projects/strangler-fig-demo'),
      'Expected Strangler case study URL to be present in sitemap.'
    );

    console.log('Smoke route checks passed.');
  } catch (error) {
    console.error(logs.trim());
    throw error;
  } finally {
    server.kill('SIGTERM');
    await delay(500);
    if (!server.killed) {
      server.kill('SIGKILL');
    }
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
