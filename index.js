const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const { handleSocketConnection } = require("./socketHandlers");
const app = express();
const server = http.createServer(app);
server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
app.get("/", (req, res) => {
  res.send("Socket.IO server is running");
  
});
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173",
     "http://localhost:5000",
     "http://192.168.1.71:5173",
     "http://192.168.137.1:5173",
    "https://vedring.netlify.app/"] },
});
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  handleSocketConnection(socket,io);
});
