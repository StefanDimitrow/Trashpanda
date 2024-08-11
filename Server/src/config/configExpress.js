const cookieParser = require("cookie-parser");
const express = require("express");
const { session } = require("../middlewares/session");

const secret = 'cookie secr3t'

function configExpress() {

  const app = express();
  app.use(cookieParser(secret));
  app.use(session())
  //TODO: ADD SESSION MIDDLEWARE;

  app.use("/static", express.static("static"));
  app.use(express.urlencoded({ extended: true }));

  return app;
}

module.exports = { configExpress };
