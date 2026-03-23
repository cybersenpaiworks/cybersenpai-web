# Etapa 1: Base
FROM node:20-alpine AS base
# Instala a biblioteca libc6-compat (necessária para algumas dependências em Alpine)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Etapa 2: Instalação de dependências
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Etapa 3: Compilação (Build)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Recebe o hash do commit do host
ARG COMMIT_HASH
ENV NEXT_PUBLIC_COMMIT_HASH=${COMMIT_HASH:-dev}

# Desativa a telemetria do Next.js durante o build
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Etapa 4: Produção (A imagem final leve)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cria um usuário não-root por segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia a pasta public (imagens, favicon, etc)
COPY --from=builder /app/public ./public

# Copia os arquivos essenciais gerados pelo modo standalone e ajusta permissões
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Define o usuário seguro
USER nextjs

# Expõe a porta que o container vai escutar
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# O comando clássico do modo standalone do Next.js
CMD ["node", "server.js"]