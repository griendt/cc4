const express = require("express");
const database = require("../database");

const app = express()

app.use(express.static('/var/www/dist'));
app.use(express.static('/var/www/public'));
app.use(express.json());

app.get('/', (request, response) => {
    response.sendFile('/var/www/dist/index.html');
});

app.get('/api/games', async (request, response) => {
    const [results] = await database.query('select * from games');
    console.log(results);
    response.send(results);
});

app.post('/api/games', async (request, response) => {
    console.log('The request contains the following');
    console.log(request.body);
    await database.query(
        'insert into games (created_at, updated_at, display_name) values (now(), now(), $name)',
        {
            bind: { name: request.body.display_name}
        });
    console.log('Created a game with name: ' + request.body.display_name);
    response.send();
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
})
