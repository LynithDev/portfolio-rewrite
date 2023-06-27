FROM node:16

WORKDIR /var/www/portfolio

COPY package.json ./

RUN npm install

COPY . .

COPY .env.docker ./.env

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start"]