const db = require('express').Router();
const path = require('path');
const fs = require('fs')


db.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
})

db.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            text,
            title
        }
    
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
      
            const jsonData = JSON.parse(data)
      
          
            jsonData.push(newNote)
      
      
            fs.writeFile(`./db/db.json`, JSON.stringify(jsonData, null, 4), (err) =>
            err
              ? console.error(err)
              : console.log(
                  `Review for ${newNote.title} has been written to JSON file`
                )
          );
          });
    }

    
});

module.exports = db