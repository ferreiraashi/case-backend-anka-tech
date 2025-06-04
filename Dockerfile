FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 

COPY . . 


RUN npx prisma generate 

RUN ls -la /usr/src/app/
RUN ls -la /usr/src/app/src/
RUN ls -la /usr/src/app/node_modules/.prisma/client/ 

RUN npm run build 

RUN ls -la /usr/src/app/ # DEPOIS do build
RUN ls -la /usr/src/app/dist/

EXPOSE 3001
CMD [ "node", "dist/server.js" ]