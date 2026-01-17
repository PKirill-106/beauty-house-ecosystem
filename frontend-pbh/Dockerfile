FROM node:24-alpine AS builder

# Working directory in container
WORKDIR /app

# Establish dependencies
COPY package*.json ./
RUN pnpm install

# Copy project
COPY . .

# Build project
ENV NODE_ENV=production
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
