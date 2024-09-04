// server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

let count = 0;

server.on('connection', ws => {
  console.log('Client connected');

  // Send the current count to the newly connected client
  ws.send(JSON.stringify({ count }));

  ws.on('message', message => {
    const data = JSON.parse(message);
    if (data.type === 'increment') {
      count++;
      // Broadcast the updated count to all connected clients
      server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ count }));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
