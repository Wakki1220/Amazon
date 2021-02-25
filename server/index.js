var express = require('express');
var app = express();
var path = require('path');

//-------2/25’Ç‰Á-----------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//--------------------------------------------------

// index.html‚ð•\Ž¦‚·‚é
// index.js‚Ìƒ‹[ƒg‚ªu/v‚ÅÝ’è‚µ‚Ä‚¢‚é‚Ì‚ÅAindex.js‚©‚çŒ©‚Äindex.html‚Í
// /(index.js‚ÌŠK‘w)+../(ˆê‚Âã‚ÌŠK‘w)+app(index.html‚ª‚¢‚éŠK‘w)‚Æ‚È‚é‚Ì‚Å
// u/../appv‚Æ‚¢‚¤‘‚«•û‚É‚È‚éH
app.use(express.static(path.join(__dirname, '/../app')));

//var { Client } = require('pg');

//var client = new Client({
//    user: 'username',
//    host: 'localhost',
//    database: 'dbname',
//    password: 'password',
//    port: 5432
//});

//client.connect();

//client.query('SELECT id FROM users', (err, res) => {
//    console.log(err);
//    client.end();
//});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Start server port:3000')
});

//-------2/25’Ç‰Á--------------
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('OK');
});
//-----------------------------