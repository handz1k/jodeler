const jodelsRouter = require("express").Router();
const User = require("../models/user");
const Jodel = require("../models/jodel");
const jwt = require("jsonwebtoken");
require("express-async-errors");

const extractAuthToken = (req) => {
  bearerToken = req.get("authorization");
  if (bearerToken && bearerToken.startsWith("Bearer ")) {
    const token = bearerToken.split(" ")[1];
    return token;
  }
  return null;
};

jodelsRouter.get("/", async (req, res) => {
  const jodels = await Jodel.find({}).populate("user", { username: 1 });
  res.json(jodels);
});

jodelsRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body.content === "") {
    return res.status(400).json("Content cannot be empty");
  }
  const decodedToken = jwt.verify(extractAuthToken(req), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const newJodel = new Jodel({
    content: body.content,
    likes: body.likes,
  });
  const savedJodel = await newJodel.save();
  res.status(201).json(savedJodel);
});

jodelsRouter.delete("/:id", async (req, res) => {
  const idToRemove = req.params.id;
  await Jodel.findByIdAndDelete(idToRemove);
  res.status(204).end();
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
  res.json(updatedJodel);
});

module.exports = jodelsRouter;
