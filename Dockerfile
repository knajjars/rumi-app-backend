FROM node:13-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

RUN npm run build

CMD ["pm2-runtime", "--json",".pm2.config.js"]