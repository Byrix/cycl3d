FROM oven/bun AS base

FROM base AS installer
WORKDIR /app
COPY bun.lock package.json ./
COPY client/package.json ./client/
COPY server/bun.lock server/package.json ./server/
RUN bun install --frozen-lockfile 

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY client ./client
RUN cd client && bun run build

FROM base AS runner
WORKDIR /app
COPY --from=installer /app/node_modules node_modules
COPY --from=installer /app/server/node_modules server/node_modules
COPY --from=builder /app/client/dist client
COPY server server

USER bun
EXPOSE 3000
CMD ["bun", "server/src/index.ts"]