const net = require('net');
let clients = new Set(); // Set to store the sockets from the connected clients

// Creates the TCP server
const server = net.createServer((socket) => {
    let message = `User ${socket.remoteAddress}:${socket.remotePort} connected to the server`; // Message when a new client connects
    
    clients.add(socket); // Adds client socket to the set
    clients.forEach((client) => { // For each socket in the set:
        try {
            client.write(message);
        } catch (err) {
            console.error(`Error when sending to ${socket.remoteAddress}:${socket.remotePort}: ${err.message}`);
            clients.delete(client);
        }
    })
    console.log(message); // Prints message in the server side
    
    // When server receives data from client
    socket.on('data', (data) => {
        console.log(`Received from client: ${data}`); 
        socket.write(`Echo: ${data}`); // Echoes the data received
    });

    // When a client disconnects
    socket.on('end', () => {
        console.log("Client disconnected"); 
        clients.delete(socket); // Removes the client socket from the set
    });

    // Error case
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