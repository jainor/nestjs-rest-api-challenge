FROM node:16-alpine

RUN mkdir /app
WORKDIR /app


COPY package*.json ./
COPY . .
RUN npm install

RUN npm run build

CMD ["npm", "start"]