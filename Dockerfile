FROM node:18

WORKDIR /usr/src/app

# Copy everything from our directory into the work directory
COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]