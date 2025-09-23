FROM oven/bun:latest-alpine AS base

FROM base AS builder
RUN apk update
WORKDIR /server
RUN bun global add turbo@^2
COPY . .
RUN turbo prune client --docker

FROM base AS installer
RUN apk update
WORKDIR /client
COPY --from=builder /client/out/json/ .
RUN bun install --frozen-lockfile 
COPY --from=builder /client/out/full/ .
RUN bun build

FROM base AS runner
WORKDIR /server
RUN addgroup --system --gid 1001 runner
RUN adduser --system --uid 1001 bunny
USER bunny

COPY --from=installer --chown=runner:bunny /client/client ./client
CMD bun start
