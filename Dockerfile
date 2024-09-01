FROM node:16-alpine3.18
WORKDIR /app
COPY . .
RUN npm install
CMD npm run start
EXPOSE 8080