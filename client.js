const net = require('net');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const client = new net.Socket(); // Creates the TCP client
const port = 8080;
const host = 'localhost';
const rl = readline.createInterface({ input, output });

let isConnected = false;
let username;

async function askForInput () {
    if (!isConnected)
        return;

    rl.question('Type a message (or "exit" to exit): ', (input) => {
        if (input.toLowerCase() == 'exit') {
            client.end();
            rl.close();
        } else {
            let message = {
                user: username,
                msg: input
            }
            client.write(JSON.stringify(message));
            askForInput();
        }
    });
}

// Connects to the server
client.connect(port, host,() => {
    console.log(`Connected to server ${host}:${port}`);
    isConnected = true;
    rl.question('Type your username (or "exit" to exit): ', (input) => {
        if (input.toLowerCase() == 'exit') {
            client.end();
            rl.close();
        } else {
            username = input;
            askForInput();
        }
    });
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