# Base image
FROM node:18-alpine

WORKDIR /app

RUN apk update
RUN apk add --no-cache python3 make g++ musl-dev

COPY package*.json ./
RUN npm install typescript
RUN npm install bcrypt --build-from-source --unsafe-perm=true
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 9090

CMD [ "node", "dist/server.js" ]
