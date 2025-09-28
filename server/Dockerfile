FROM oven/bun:latest-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN bun install -g turbo@^2
COPY . .
RUN turbo prune @cycl3d/server --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN bun install --frozen-lockfile 
COPY --from=builder /server/out/full/ .
RUN bun turbo build

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 runner
RUN adduser --system --uid 1001 bunny
USER bunny

COPY --from=installer --chown=runner:bunny /app ./
CMD bun start
