const db = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('../helpers/uuid')




// fs.readFile('./db/db.json', 'utf8', (err, data) => {
// if (err) {
//     console.log(err)
// } else {
//     db.get('/', (req, res) => {
//         res.send(data)
//     })
// }
// });


// use fs to read file then send back data
db.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
});



db.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            text,
            title,
            note_id: uuid()
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

});



module.exports = db