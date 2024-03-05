const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("express-async-errors");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("jodel", { content: 1 });
  return res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const userInDb = await User.findOne({ username });
  if (userInDb) {
    return res.status(409).json({
      error: "Account already in DB",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    passwordHash,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
