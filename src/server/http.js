const express = require("express");
const models = require('../database/models');

const app = express()

app.use(express.static('/var/www/dist'));
app.use(express.static('/var/www/public'));
app.use(express.json());

app.get('/', (request, response) => {
    response.sendFile('/var/www/dist/index.html');
});

app.get('/api/games', async (request, response) => {
    response.send(await models.Game.findAll());
});

app.post('/api/games', async (request, response) => {
    console.log('The request contains the following');
    console.log(request.body);

    const game = new models.Game({display_name: request.body.display_name});
    await game.save();
    console.log('Created a game with name: ' + request.body.display_name);
    response.send();
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
})
