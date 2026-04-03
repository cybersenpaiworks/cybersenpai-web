# Cyber Senpai Web

Site institucional da Cyber Senpai Works com catálogo bilíngue de coding challenges em Next.js.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript estrito
- Tailwind CSS 4
- Deploy Docker em modo `standalone`

## Requisitos

- Node.js `20.19.6`
- npm `10+`

O repositório inclui um arquivo `.nvmrc` para alinhar o ambiente local com a versão esperada.

## Setup local

```bash
nvm install
nvm use
npm ci
```

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run start
npm run smoke
```

## Sincronização dos challenges

O catálogo base fica versionado em `data/challenges.json`.

O comando abaixo consulta o repositório do The Coding Train e atualiza esse arquivo:

```bash
npm run sync
```

Notas importantes:

- `sync` é manual e não faz mais parte do `build`
- o comando requer Node 20+ por usar `fetch` nativo
- a sincronização depende de acesso à API do GitHub

## Arquitetura

### Rotas

- `app/[lang]/page.tsx`: home institucional
- `app/[lang]/challenges/page.tsx`: grade de desafios
- `app/[lang]/challenges/[slug]/page.tsx`: detalhe de um desafio implementado
- `proxy.ts`: detecção e redirecionamento de locale

### Internacionalização

- os dicionários ficam em `dictionaries/pt.json` e `dictionaries/en.json`
- o carregamento acontece via `getDictionary(lang)`
- o locale padrão é `pt`

### Challenges

- o catálogo sincronizado fica em `data/challenges.json`
- a camada tipada do catálogo fica em `data/challenges.ts`
- desafios implementados são registrados em `data/implementedChallenges.ts`
- o mapeamento de componentes fica em `components/challenges/registry.tsx`

## Build e deploy

O projeto usa `output: "standalone"` em `next.config.ts` e possui `Dockerfile` multi-stage para produção.

### Portainer via Git

O repositório inclui `docker-compose.yml` para uso em `Stacks -> Git repository` no Portainer.

Variáveis mínimas da stack:

```bash
SITE_URL=https://seu-dominio.example.com
COMMIT_HASH=portainer-git
PROXY_NETWORK=proxy-network
```

O arquivo `portainer.env.example` serve como referência.

Observações:

- `SITE_URL` entra no build e no runtime para manter `canonical`, `robots.txt` e `sitemap.xml` com o domínio correto
- `COMMIT_HASH` é opcional, mas evita que a versão exibida caia para `dev`
- a stack conecta o app à rede Docker externa `proxy-network`
- o app fica acessível internamente como `cybersenpai-web:3000`
- no Nginx Proxy Manager, o `Forward Hostname / IP` deve ser `cybersenpai-web` e a porta `3000`
- se a sua rede externa tiver outro nome, ajuste `PROXY_NETWORK`

Fluxo esperado:

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
npm run smoke
```

## Estado atual

- a home e a navegação principal são bilíngues
- o catálogo lista todos os desafios sincronizados
- apenas desafios marcados como `implemented: true` possuem página pública
- o README anterior era boilerplate do `create-next-app` e foi substituído por esta documentação
