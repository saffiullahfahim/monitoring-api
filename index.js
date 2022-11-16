const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const monitorRouter = require("./routes/monitor");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

// app init
const app = express();
const server = https.createServer(options, app);
dotenv.config();

// socket
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
global.io = io;

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

// core
app.use(cors());

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing setup
app.use("/monitor", monitorRouter);


app.get("/.well-known/pki-validation/39AC2E47152C8315B7582D649AB94FC0.txt", (req, res) => {
  res.send(`E83D47FC0B557B93FB7CFCBC262554DA5A51177787AEDE45C0B48C676D718AE4 comodoca.com 637502a5a5b33`)
})

server.listen(443, () => {
  console.log(`app listening to port ${443}`);
});

// http server
const httpServer = http.createServer(app);

httpServer.listen(80);
