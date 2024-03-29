const express = require("express");
const http = require("http");
const app = express();
require("dotenv").config();
const cors = require("cors");
const jodelsRouter = require("./controllers/jodels");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const loginRouter = require("./controllers/login");

require("express-async-errors");
require("dotenv").config();

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/jodel", jodelsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
