const net = require('net');
const message = "Olá\n"; // Data to be send
const client = new net.Socket(); // Creates the TCP client
const port = 8080;
const host = 'localhost';

// Connects to the server
client.connect(port, host,() => {
    console.log(`Connected to server ${host}:${port}`);
    client.write(message);
});

// When the server responds
client.on('data', (data) => {
    console.log(`Server response: ${data}`);
    client.destroy();
});

// Error case
client.on('error', (err) => {
    console.error("Client error: ", err);
});