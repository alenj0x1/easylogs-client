FROM node:20

WORKDIR /app

COPY . .

RUN yarn install && npx ng build && npm install -g serve

EXPOSE 3000

CMD ["serve", "dist/easylogs-client/browser"]
