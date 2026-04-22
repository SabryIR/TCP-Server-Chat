const net = require('net');
let clients = new Set(); // Set to store the sockets from the connected clients

// Creates the TCP server
const server = net.createServer((socket) => {
    function broadcast (message, sender = null) {
        clients.forEach((client) => {
            // Does not send the data message back to its origin
            if (client != sender) {
                try {
                    client.write(message);
                } catch (err) {
                    console.error(`Error when sending to ${socket.remoteAddress}:${socket.remotePort}: ${err.message}`);
                    clients.delete(client);
                }
            }
        });
    }
    
    let message = `User ${socket.remoteAddress}:${socket.remotePort} connected to the server`; // Message when a new client connects
    
    clients.add(socket); // Adds client socket to the set
    broadcast(message); // Sends message to all clients
    console.log(message); // Prints message in the server side
    
    // When server receives data from client
    socket.on('data', (data) => {
        console.log(`Received from client ${socket.remoteAddress}:${socket.remotePort}: ${data}`); 
        broadcast(data, socket); // Broadcasts the data to all clients except the sender
    });

    // When a client disconnects
    socket.on('end', () => {
        console.log(`Client ${socket.remoteAddress}:${socket.remotePort} disconnected`); 
        clients.delete(socket); // Removes the client socket from the set
        broadcast(`User ${socket.remoteAddress}:${socket.remotePort} disconnected`);
    });

    // Error handling
    socket.on('error', (err) => {
        console.error("Socket error: ", err); 
        clients.delete(socket); // Removes the client socket from the list
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

process.on('SIGINT', () => {
    console.log("Server shutting down...");
    process.exit();
});