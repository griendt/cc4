## Getting started
To spin up the development server, copy `.env.example` to `.env`, fill in all the fields, then run the following:
```shell
# spin up the containers
docker-compose up -d
# set up or sync database schema
node src/database/sync.js
# open the websocket server (ws) and http server (ports 3000 and 8080 respectively)
node src/server/ws.js
node src/server/http.js
# compile the Vue JS and Tailwind CSS
npm run build && npx tailwindcss -i ./src/index.css -o ./public/output.css
```
