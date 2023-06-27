FROM node:16

WORKDIR /var/www/portfolio

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start"]