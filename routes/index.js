// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
"use strict";
const app = require('express')();
const line_login = require("line-login");
const session = require("express-session");
const session_options = {
  secret: "412a3c4906b4bd1703d2410de350f037",
  resave: false,
  saveUninitialized: false
}
app.use(session(session_options));

const login = new line_login({
  channel_id: "1625995840",
  channel_secret: "412a3c4906b4bd1703d2410de350f037",
  callback_url: "http://127.0.0.1:8000/api/callback/line",
  scope: "openid profile",
  prompt: "consent",
  bot_prompt: "normal"
});

// Specify the path you want to start authorization.
app.use("/", login.auth());

// Specify the path you want to wait for the callback from LINE authorization endpoint.
app.use("/callback", login.callback(
    (req, res, next, token_response) => {
      // Success callback

      res.json(token_response);

    },
    (req, res, next, error) => {
      // Failure callback
      res.status(400).json(error);
    }
));

module.exports = app;
