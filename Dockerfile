FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Install TypeScript globally
# RUN npm install -g typescript

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]