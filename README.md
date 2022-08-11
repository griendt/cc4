## Getting started
To spin up the development server, copy `.env.example` to `.env`, fill in all the fields, then run the following:
```shell
docker-compose up -d        # spin up the containers
node src/migration.js up    # run migrations
node src/wss.js             # open the websocket server (ws) at port 3000
npm run serve               # start the Vue web server (http) at port 8080
```
