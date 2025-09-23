FROM oven/bun:latest-alpine AS base

FROM base AS builder
RUN apk update
WORKDIR /server
RUN bun global add turbo@^2
COPY . .
RUN turbo prune server --docker

FROM base AS installer
RUN apk update
WORKDIR /server
COPY --from=builder /server/out/json/ .
RUN bun install --frozen-lockfile 
COPY --from=builder /server/out/full/ .
RUN bun build

FROM base AS runner
WORKDIR /server
RUN addgroup --system --gid 1001 runner
RUN adduser --system --uid 1001 bunny
USER bunny

COPY --from=installer --chown=runner:bunny /server/server ./server
CMD bun start
