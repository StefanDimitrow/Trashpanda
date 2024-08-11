const { User } = require("../models/User");
const bcrypt = require("bcrypt");
//TODO: set indentity prop name based on exam;
const indentityName = "email";

async function register(indentity, password) {
  const existing = await User.findOne({ [indentityName]: indentity });

  if (existing) {
    throw new Error(`This ${indentityName} is already in use!`);
  }

  const user = new User({
    [indentityName]: indentity,
    password: await bcrypt.hash(password, 10),
  });

  await user.save();

  return user;
}

async function login(indentity, password) {
  const user = await User.findOne({ [indentityName]: indentity });

  if (!user) {
    throw new Error("Incorrect username or password!");
  }

  match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect username or password!");
  }

  return user;
}

module.exports = {
  register,
  login,
};
