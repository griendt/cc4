## Getting started
To spin up the development server, copy `.env.example` to `.env`, fill in all the fields, then run the following:
```shell
docker-compose up -d        # spin up the containers
node src/migration.js up    # run migrations
node src/server/ws.js       # open the websocket server (ws) at port 3000
node src/server/http.js     # open up the http server at port 8080
npm run build               # compile the Vue JS
```
