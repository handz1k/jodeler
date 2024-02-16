const express = require("express");
const http = require("http");
const app = express();
require("dotenv").config();
const cors = require("cors");
const jodelsRouter = require("./controllers/jodels");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

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
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
