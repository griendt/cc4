const database = require('../database');

const WebSocket = require('ws');
const ws = new WebSocket.Server({
    port: 3000,
})

ws.on('connection', async (socket) => {
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