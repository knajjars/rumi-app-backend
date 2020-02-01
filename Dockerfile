FROM node:13

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --quiet
RUN npm install pm2 -g --quiet

COPY . .

RUN npm run build

CMD ["pm2-runtime", "--json",".pm2.config.js"]