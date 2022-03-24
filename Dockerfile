# build environment
FROM node:lts-alpine as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN npm install --legacy-peer-deps
RUN npm rum buid

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
