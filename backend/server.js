const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("config");
const session = require("express-session");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const PORT = 5001;
const dotenv = require("dotenv");
const production = dotenv.config({ path: "../.env" }).parsed.REACT_APP_PRODUCTION==='true';
app.use(
  cors({
    origin: production
      ? "https://sportbuddy.elliottchong.com"
      : "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ extended: false }));
app.use(
  session({
    secret: config.get("session_secret"),
    resave: false,
    saveUninitialized: false,
  })
);

connectDB();

app.get("/", (req, res) => res.send("SportBuddy API running"));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("new message", (data) => {
    io.emit("new message", data);
  });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/listing", require("./routes/listing"));

server.listen(process.env.PORT || PORT, () =>
  console.log(
    production ? "Production: " : "Development: ",
    "Server Running on http://localhost:5001"
  )
);
