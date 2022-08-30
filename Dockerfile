FROM node:14-alpine

RUN mkdir /app
WORKDIR /app


COPY package*.json ./
COPY . .
RUN npm install

RUN npm run build

CMD ["sh", "-c", "npx prisma migrate deploy ; node dist/main"]