const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  // Handle user joining
  socket.on("user joined", (userData) => {
    console.log(`👤 User Joined: ${userData.name}`);
    socket.broadcast.emit("user joined", userData);
  });

  // Handle chat messages
  socket.on("chat message", (data) => {
    console.log("💬 Message received:", data);
    io.emit("chat message", {
      user: data.user, // Ensure the user data is sent
      message: data.message,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  // Typing indicator
  socket.on("typing", (user) => {
    socket.broadcast.emit("typing", user);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
