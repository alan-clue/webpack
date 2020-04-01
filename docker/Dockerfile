FROM node:10.13-alpine

COPY package.json /myapp/package.json
COPY webpack.config.js /myapp/webpack.config.js

WORKDIR /myapp

RUN npm install

EXPOSE 5000
# CMD ["npm", "run", "start"]