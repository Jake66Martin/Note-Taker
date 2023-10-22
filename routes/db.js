const db = require('express').Router();
const path = require('path');


db.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
})

module.exports = db