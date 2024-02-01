FROM node:18
LABEL authors="Pau Costa"

WORKDIR /usr/local/app

COPY package.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]


