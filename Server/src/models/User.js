const { Schema, model } = require("mongoose");

//TODO: Add/change properties according to the exam;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = { User };

//TODO: replace with data model from exam;
