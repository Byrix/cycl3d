FROM oven/bun:alpine AS base

FROM base AS installer
WORKDIR /app
COPY package.json bun.lock ./
COPY client/package.json ./client/
COPY server/package.json server/bun.lock ./server/
RUN bun install --frozen-lockfile 
COPY . .
RUN bun run build

FROM nginx
RUN rm -rf /usr/share/nginx/html/
COPY --from=installer /app/client/dist /usr/share/nginx/html
COPY --from=installer /app/client/public /usr/share/nginx/html/public
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
