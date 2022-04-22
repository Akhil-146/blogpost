# Step 1 : Specify a base image
FROM node:alpine

# Step 2 : Install dependencies and additional programs
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY ./ ./


# Step 3 : Specify a Startup command
CMD [ "npm", "start" ]