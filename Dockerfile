FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest && npm install
COPY server.js

FROM node:22-alpine
LABEL org.opencontainers.image.authors="Jakub Mazur"

WORKDIR /app
COPY --from=builder /app ./

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

USER node

EXPOSE 3000

CMD ["node", "server.js"]
