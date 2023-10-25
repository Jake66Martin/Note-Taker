const db = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('../helpers/uuid')
const newData = require('../db/db.json')



db.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
});



db.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            text,
            title,
            id: uuid()
        }

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const jsonData = JSON.parse(data)


            jsonData.push(newNote)


            fs.writeFile(`./db/db.json`, JSON.stringify(jsonData, null, 4), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    return res.json(newNote)
                }

            });
        });

    }


});



db.delete('/', (req, res) => {

    const itemId = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        const jsData = JSON.parse(data)

        for (let i = 0; i < jsData.length; i++) {

            if (itemId === jsData[i].id) {

                jsData.splice(jsData[i], 1);

                fs.writeFile(`./db/db.json`, JSON.stringify(jsData, null, 4), (err) => {

                });


            }
        }
    });



});



module.exports = db