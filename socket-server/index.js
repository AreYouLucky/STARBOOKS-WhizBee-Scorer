const http = require("http");
const { Server } = require("socket.io");

const socketUrlValue = process.env.VITE_SOCKET_URL || "http://192.168.1.31:3001";
const socketUrl = new URL(socketUrlValue);
const HOST = process.env.SOCKET_HOST || socketUrl.hostname;
const PORT = Number(process.env.SOCKET_PORT || socketUrl.port || 3001);
const corsOrigin = process.env.SOCKET_CORS_ORIGIN || "*";

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error(`Invalid socket port: ${PORT}`);
}

const server = http.createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  response.writeHead(404);
  response.end();
});

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (data) => {
    console.log("Received:", data);
    io.emit("chat message", data); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Socket.IO server running on ${socketUrlValue}`);
  console.log(`Listening on ${HOST}:${PORT}`);
});
