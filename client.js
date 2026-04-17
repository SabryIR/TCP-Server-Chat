const net = require('net');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const message = "Olá\n"; // Data to be send
const client = new net.Socket(); // Creates the TCP client
const port = 8080;
const host = 'localhost';
const rl = readline.createInterface({ input, output });

let isConnected = false;

async function askForInput () {
    if (!isConnected)
        return;

    rl.question('Type a message (or "exit" to exit): ', (input) => {
        if (input.toLowerCase() == 'exit') {
            client.end();
            rl.close();
        } else {
            client.write(input);
            askForInput();
        }
    });
}

// Connects to the server
client.connect(port, host,() => {
    console.log(`Connected to server ${host}:${port}`);
    isConnected = true;
    askForInput();
});

// When the server responds
client.on('data', (data) => {
    console.log(`Server response: ${data}`);
    askForInput();
});

// Error handling
client.on('error', (err) => {
    console.error("Client error: ", err);
    isConnected = false;
});

process.on('SIGINT', () => {
    if (isConnected) {
        client.end();
        console.log("Disconnecting from the server...");
    }
    process.exit();
});