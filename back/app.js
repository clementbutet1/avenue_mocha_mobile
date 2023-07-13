require("dotenv").config();
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const proxy = require("proxy-attack");
const path = require("path");
const favicon = require("serve-favicon");
const GracefulShutdownManage = require("@moebius/http-graceful-shutdown").GracefulShutdownManager;

// Create https server
var httpServer = http.createServer(app);

// Manage graceful shutdown
const httpShutdownManager = new GracefulShutdownManage(httpServer);

// Routes
const userRoute = require("./routes/users");
const coffeesRoute = require("./routes/coffees");
const commands = require('./routes/commands');
const coffeeCommand = require('./routes/coffeeCommand')

const limit = rateLimit({
  max: 250,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests",
});
app.disable("x-powered-by");
app.use(proxy());
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: false}));
app.use(cors());
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let depth_limit = 10;
app.use(express.json({ limit: "100kb" }));

let limit_depth = (obj, current_depth, limit) => {
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      if (current_depth + 1 === limit) {
        obj[key] = "[object Object]";
      } else {
        limit_depth(obj[key], current_depth + 1, limit);
      }
    }
  }
};
app.use(function (req, res, next) {
  limit_depth(req.body, 0, depth_limit);
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.get("/", function (req, res) { res.status(200).sendFile(path.join(__dirname + "/views/start.html"));});

// Essential routes for apis
app.use("/api/user", userRoute, limit);
app.use("/api/coffees", coffeesRoute, limit);
app.use("/api/commands", commands, limit);
app.use("/api/coffeecommands", coffeeCommand, limit);

app.use(function (err, req, res, next) {console.log(err); next(err);});

app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname + "/views/404.html"));
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is live"))
  .catch((err) => console.log(err));

// Start server
httpServer.listen(8080);
console.log(`Server running on https://localhost:${process.env.PORT}`);

// Intercept Segmentation Fault for graceful shutdown
process.on("SIGTERM", () => {
    httpShutdownManager.terminate(() => {
      console.log("Server closing.");
    });
});
