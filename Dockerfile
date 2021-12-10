# build environment
FROM node:lts-alpine as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install --frozen-lockfile
RUN yarn build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]