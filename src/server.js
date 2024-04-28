const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');


// // Load SSL/TLS certificates
// const privateKey = fs.readFileSync('/path/to/private.key', 'utf8');
// const certificate = fs.readFileSync('/path/to/certificate.crt', 'utf8');

// const credentials = { key: privateKey, cert: certificate };

// // Create a WebSocket server over HTTPS
// const wss = new WebSocket.Server({ server: https.createServer(credentials) });


// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = [];

// WebSocket server event listeners
wss.on('connection', function connection(ws) {
    // Add client to clients array
    clients.push(ws);

    ws.on('message', function incoming(message) {
        // Parse incoming message
        const data = JSON.parse(message);

        // Broadcast message to all connected clients except the sender
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    ws.on('close', function() {
        // Remove client from clients array
        const index = clients.indexOf(ws);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});

console.log('WebSocket server started on port 8080');