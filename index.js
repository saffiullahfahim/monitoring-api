const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const monitorRouter = require("./routes/monitor");
const cors = require("cors");

// app init
const app = express();
const server = http.createServer(app);
dotenv.config();

// socket
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
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

server.listen(3000, () => {
  console.log(`app listening to port ${3000}`);
});
