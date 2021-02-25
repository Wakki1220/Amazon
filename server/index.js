var express = require('express');
var app = express();
var path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// index.htmlを表示する
// index.jsのルートが「/」で設定しているので、index.jsから見てindex.htmlは
// /(index.jsの階層)+../(一つ上の階層)+app(index.htmlがいる階層)となるので
// 「/../app」という書き方になる？
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

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('OK');
});