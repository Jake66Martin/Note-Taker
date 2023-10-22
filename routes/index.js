const express = require('express');

const dbReq = require("./db.js");

const app = express();

app.use('/notes', dbReq);

module.exports = app;