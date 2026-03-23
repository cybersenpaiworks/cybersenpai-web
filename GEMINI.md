# Mandatos do Projeto: Cyber Senpai Web

Este documento define a arquitetura e as convenções obrigatórias para o desenvolvimento deste projeto.

## 1. Arquitetura de Internacionalização (i18n)
- **Estrutura de Pastas:** Todas as rotas públicas devem residir dentro de `app/[lang]/`.
- **Dicionários:** As traduções devem ser mantidas em `dictionaries/{lang}.json`.
- **Consumo de Traduções:** Utilizar exclusivamente o utilitário `getDictionary(lang)` em Server Components.
- **Detecção de Idioma:** O fluxo de redirecionamento e detecção é centralizado no middleware (atualmente definido em `proxy.ts`). Qualquer alteração em rotas deve ser refletida no `matcher` do middleware.

## 2. Padrões de Componentes e Estilização
- **Server Components por Padrão:** Todos os componentes devem ser Server Components, a menos que exijam interatividade (hooks como `useState`, `useEffect`).
- **Tailwind CSS 4:** Utilizar as novas capacidades do Tailwind 4. Evitar configurações complexas no `tailwind.config.ts` se puderem ser resolvidas via variáveis de CSS no `globals.css`.
- **Tematização:** Seguir a paleta base `slate-900` para fundos e `cyan-400`/`blue-500` para destaques e gradientes.

## 3. Desenvolvimento e Tipagem
- **TypeScript Estrito:** Todas as props de páginas e layouts que recebem `params` devem tipar `lang` explicitamente como `'pt' | 'en'`.
- **Async Params:** Em conformidade com o Next.js 15/16, tratar `params` e `searchParams` como Promises (`await params`).

## 4. Infraestrutura e Deploy
- **Docker Standalone:** O projeto é otimizado para deploy via Docker (`output: "standalone"` no `next.config.ts`). Não adicionar dependências que exijam binários externos pesados sem atualizar o `Dockerfile`.
- **Segurança:** O arquivo `next.config.ts` mantém `allowedDevOrigins` específicos. Não remover estas configurações sem consulta prévia.

## 5. Fluxo de Trabalho
- **Surgical Updates:** Modificações devem ser pontuais e preservar a estética minimalista e de alta performance do site.
- **Validação:** Sempre verificar se as mudanças não quebram o suporte a um dos idiomas suportados (PT/EN).
