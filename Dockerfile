FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY prisma ./prisma

# Install deps first; generate client after schema is present
RUN npm ci --omit=dev --ignore-scripts \
  && npx prisma generate

COPY src ./src
COPY seed ./seed

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
