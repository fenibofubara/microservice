# specify a base image, the alpine version is the minimalist version. Use it.
FROM node:alpine

# was added because v15 version of Node throws an "idealTree" error without it
WORKDIR /usr/app

# was added cos the  & package.json directory  is outside of the node:alpine image at the time
COPY ./package.json ./

# install some dependencies
RUN npm install

# was added this so the index.js file will be copied into the container and autoupdate on build
COPY ./ ./

#default command

CMD ["npm","start"]