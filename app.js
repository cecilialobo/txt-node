const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    fs.readFile("./text.txt", "utf8", (err, data) => {
       if(err) {
           console.error(err);
           res.status(500).send();
           return;
        }
        
        const result = data.split("\n");
        res.send(JSON.stringify({"posts": result}));
    });
});

app.post('/posts', (req, res) => {
  fs.appendFile("./text.txt", "\nHello FED 22", (err) => {
    if (err) {
        console.error(err);
        res.status(500).send();
        return;
     }
     
     console.log("Appended!")
  });
  
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
