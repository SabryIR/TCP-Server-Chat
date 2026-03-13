const net = require('net');

// Creates the TCP server
const server = net.createServer((socket) => {
    console.log("Client connected");
    
    // When server receives data from client
    socket.on('data', (data) => {
        console.log(`Received from client: ${data}`);
        socket.write(`Echo: ${data}`);
    });

    // When the client(s) disconnects
    socket.on('end', () => {
        console.log("Client disconnected");
    });

    // Error case
    socket.on('error', (err) => {
        console.error("Socket error: ", err);
    });
});
const port = 8080; // Server listens on port 8080

// Server listens
server.listen(port, () => {
    console.log(`TCP server listening on port ${port}`);
});

// Server error case
server.on('error', (err) => {
    console.error("Server error: ", err);
})