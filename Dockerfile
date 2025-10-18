FROM oven/bun AS base

FROM base AS installer
RUN mkdir -p /bun/cache
WORKDIR /inst
COPY . .
RUN bun install --frozen-lockfile

FROM base AS runner
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN cd client && bun run build

USER bun
EXPOSE 3000
CMD ["bun", "server/src/index.ts"]
