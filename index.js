const express = require('express');
const cors = require('cors');
const parser = require('body-parser')

const app = express();
const port = 3000;

const data = require('./data');

app.use(cors());
app.use(parser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.post('/', (req, res) => {
    console.log(req.body);
})

app.get('/user/project/notes/list/', (req, res) => {
    res.send(data.noteList);
});

app.get('/user/project/notes/list/:id', (req, res) => {
    for(i = 0; i < data.noteList['notes'].length; i++) {
        if(data.noteList['notes'][i]['id'] == req.params.id) {
            res.send(data.noteList['notes'][i]);
        }
    }
})

app.listen(port, () => {
    console.log("Listening on port " + port);
})