FROM node:14.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY . .
COPY --chown=node:node . .

# exposing in docker-compose files according to env
EXPOSE 4000
CMD ["npm", "start"]
