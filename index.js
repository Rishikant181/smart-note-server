const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const data = require('./data');

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.get('/user/projects/list/', (req, res) => {
    res.send(data.noteList);
});

app.get('/user/projects/list/:id', (req, res) => {
    for(i = 0; i < data.noteList['notes'].length; i++) {
        if(data.noteList['notes'][i]['id'] == req.params.id) {
            console.log(data.noteList['notes'][i])
            res.send(data.noteList['notes'][i]);
        }
    }
})

app.listen(port, () => {
    console.log("Listening on port " + port);
})