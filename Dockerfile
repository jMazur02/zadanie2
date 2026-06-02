FROM node:22-alpine AS builder
RUN apk update && apk upgrade --no-cache
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY server.js .

FROM node:22-alpine
RUN apk update && apk upgrade --no-cache
LABEL org.opencontainers.image.authors="Jakub Mazur"

WORKDIR /app
COPY --from=builder /app ./

RUN rm -rf /usr/local/lib/node_modules/npm \
    && rm -f /usr/local/bin/npm \
    && rm -f /usr/local/bin/npx

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

USER node

EXPOSE 3000

CMD ["node", "server.js"]
