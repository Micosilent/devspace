FROM node:18
LABEL authors="Pau Costa"

WORKDIR /usr/local/app

COPY package.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "start"]

