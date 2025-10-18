FROM oven/bun AS base

FROM base AS installer
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN cd client && bun run build

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .
RUN bun install --frozen-lockfile
RUN rm -rf client
COPY --from=installer /app/client/dist client

USER bun
EXPOSE 3000
CMD ["bun", "server/src/index.ts"]
