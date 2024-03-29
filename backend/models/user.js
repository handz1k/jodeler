const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3, unique: true },
  passwordHash: { type: String, required: true, minLength: 3 },
  jodel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jodel",
  },
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
