const ConsoleIO = require('readline');
const WebSocket = require('ws');
// https://github.com/websockets/ws/blob/master/doc/ws.md - FullApi

const rl = ConsoleIO.createInterface({
    input: process.stdin,
    output: process.stdout
});

answer = 3000;
// rl.question('What port number socket-server? ', (answer) => {
// console.log(`Selected: ${answer} Start Server...`);

const server = new WebSocket.Server({
    port: +answer,
    // clientTracking: true,
    // perMessageDeflate: true,
    // noServer:true,
    // verifyClient: (info) => {console.log(info)    },//watch full meta-info about client
}, () => console.log(`Server started on ${answer} port!`));

server.on("connection", (ws, req) => {




    // console.log('Full meta-data', req) //watch full meta-info about client (connected)
    console.log(`Client IP: ${req.socket.remoteAddress}`); // IP клиента
    console.log(server.clients.size); // Количество клиентов (server.clients содержит метаданные)

    ws.on('message', message => {
        if (message === '_exit') {
            ws.close();
        }

        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message, {mask:false},()=>{console.log(`Отправлено сообщение ${message}`)});
            }
        })
    })


    ws.on('ping',buffer => console.log(`-- Ping`, buffer));
    ws.on('pong',buffer => console.log(`-- Pong`, buffer));
    ws.on('open',buffer => console.log(`-- Open`, buffer));
    ws.on('close',buffer => console.log(`-- Close`, buffer));

    ws.send('Server says hello to you!');
})

console.log(server.address());
console.log(server.clients.size);

// rl.close();


// });



