const jodelsRouter = require("express").Router();
const User = require("../models/user");
const Jodel = require("../models/jodel");
const jwt = require("jsonwebtoken");
require("express-async-errors");

jodelsRouter.get("/", async (req, res) => {
  const jodels = await Jodel.find({});
  res.json(jodels);
});

jodelsRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body.content === "") {
    return res.status(400).send("Content cannot be empty");
  }
  const newJodel = new Jodel({
    content: body.content,
    author: body.author,
    likes: body.likes,
  });
  const savedJodel = await newJodel.save();
  res.status(201).json(savedJodel);
});

jodelsRouter.delete("/:id", async (req, res) => {
  const idToRemove = req.params.id;
  await Jodel.findByIdAndDelete(idToRemove);
  response.status(204).end();
});

jodelsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const jodel = {
    content: body.content,
    author: body.author,
    likes: body.likes,
  };
  const updatedJodel = await Blog.findByIdAndUpdate(req.params.id, jodel, {
    new: true,
  });
  response.json(updatedJodel);
});

module.exports = jodelsRouter;
