const database = require('./database');

const WebSocket = require('ws');
const wss = new WebSocket.Server({
    port: 3000,
})

wss.on('connection', async (socket) => {

    const [results] = await database.query('select * from games');

    console.log(results);
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');

        const blob = JSON.stringify({foo: "bar"})
        database.query(`insert into games (\`blob\`) values ('${blob}')`)
    });

    socket.on('message', (msg) => {
        console.log('Received a message:' + msg);
        const message = (JSON.parse(msg.toString()));

        console.log(message);
        console.log(message.type);
        console.log(message.payload);

        socket.send('Some response!');
    });
});