FROM node:18.19-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm i 

COPY . .

RUN pnpm run build

FROM node:18.19-alpine AS production

ARG NODE_ENV=production  
ENV NODE_ENV=${NODE_ENV}
 

WORKDIR /usr/src/app 

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm i --prod 

COPY --from=development /usr/src/app/dist ./dist

CMD ["pnpm", "start:prod"]
 
