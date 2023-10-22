const db = require('express').Router();
const path = require('path');


db.get("/", (req, res) => {
   
   const filePath = 'C:\bootcamp\github\Note-Taker\db\db.json'
    res.sendFile(filePath)
})

module.exports = db