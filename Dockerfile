FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install --force
EXPOSE $PORT
CMD npm run start