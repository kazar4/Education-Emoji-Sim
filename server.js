const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');
const GraphemeSplitter = require('grapheme-splitter')


// Load SSL/TLS certificates
const privateKey = fs.readFileSync('/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('/ssl/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Create a WebSocket server over HTTPS
const wss = new WebSocket.Server({ server: https.createServer(credentials).listen(8082) });

// // Create a WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = [];

let binaryBool = false;

let emojiSwitch = {
    "👍":"👎",
    "👍🏿": "👎🏻",
    "👍🏾": "👎🏽",
    "❤️": "🫀",
    "✅": "💀",
    "😂": "🖾",
    "😭": "🧅",
    "✔️": "💀",
    "☑️": "💀",
    "👀": "🫠"


}

// WebSocket server event listeners
wss.on('connection', function connection(ws) {
    // Add client to clients array
    clients.push(ws);

    ws.on('message', function incoming(message) {

        let data = JSON.parse(message);

        console.log(data)

        if ('data' in data) {
            if (data.data === "on") {
                console.log("turning it on")
                binaryBool = true;
                return
            } else if (data.data === "off") {
                console.log("turning it off")
                binaryBool = false;
                return
            }
        }

        // Parse incoming message


        let splitter = new GraphemeSplitter();
        // split the string to an array of grapheme clusters (one string each)
        let graphemes = splitter.splitGraphemes(data.emoji);

        data.emoji = graphemes[0]

        function hex2bin(hex){
            return (parseInt(hex, 16).toString(2)).padStart(8, '0');
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        if (data.emoji in emojiSwitch) {
            data.emoji = emojiSwitch[data.emoji]
        }

        if (binaryBool == true) {
            let hexValue = data.emoji.codePointAt(0).toString(16)
            let binValue = hex2bin(hexValue)

            if (getRandomInt(3) == 0) {
                data.emoji = binValue
            }
        }

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

console.log('WebSocket server started on port 8082');