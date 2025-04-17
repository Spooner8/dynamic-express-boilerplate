# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /build/dist ./dist
COPY --from=builder /build/generated ./generated
COPY package*.json ./

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "prod"]