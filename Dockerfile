FROM node:20

WORKDIR /app

COPY . .

RUN yarn install && npx ng build --configuration=production && npm install -g serve

EXPOSE 3000

CMD ["serve", "-s ", "dist/easylogs-client/browser", "--single"]
