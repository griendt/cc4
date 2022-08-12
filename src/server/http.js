const express = require("express");
const database = require("../database");

const app = express()

app.use(express.static('/var/www/dist'));
app.use(express.static('/var/www/public'));


app.get('/', (request, response) => {
    response.sendFile('/var/www/dist/index.html');
});

app.get('/api/games', async (request, response) => {
    const [results] = await database.query('select * from games');
    console.log(results);
    response.send(results);
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
})
