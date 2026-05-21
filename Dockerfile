FROM node:22-alpine AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile && pnpm add sharp

FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN pnpm run build

FROM node:22-alpine AS runner
RUN apk update && apk -i upgrade
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/next.config.ts ./next.config.ts
COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.env ./.env

USER node

EXPOSE 8080
ENV PORT 8080

CMD ["pnpm", "start"]
