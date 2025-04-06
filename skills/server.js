const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, ".."))); // 🔥 this points to project root

// Route for index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Socket.io handlers...
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("user joined", (userData) => {
    console.log(`👤 User Joined: ${userData.name}`);
    socket.broadcast.emit("user joined", userData);
  });

  socket.on("chat message", (data) => {
    console.log("💬 Message received:", data);
    io.emit("chat message", {
      user: data.user,
      message: data.message,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  socket.on("typing", (user) => {
    socket.broadcast.emit("typing", user);
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
