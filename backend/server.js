const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const initialisePassport = require("./config/passport-config");
const config = require("config");
const session = require("express-session");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const PORT = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, Application-Type, application-type"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE");

  // req.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  // req.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, Application-Type, application-type"
  // );
  // req.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE");
  next();
});
initialisePassport(passport);
app.use(express.json({ extended: false }));
app.use(
  session({
    secret: config.get("session_secret"),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.get("/", (req, res) => res.send("SportBuddy api running"));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("new message", (data) => {
    console.log("emitting in server");
    io.emit("new message", data);
  });
});

app.use("/api/auth", require("./routes/auth"));
// app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/listing", require("./routes/listing"));
// app.use("/api/profile", require("./routes/api/profile"));

server.listen(process.env.PORT || PORT, () =>
  console.log("Server Running on http://localhost:5000")
);
