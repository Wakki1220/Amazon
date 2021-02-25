var express = require('express');
var app = express();
var path = require('path');

//-------2/25�ǉ�-----------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//--------------------------------------------------

// index.html��\������
// index.js�̃��[�g���u/�v�Őݒ肵�Ă���̂ŁAindex.js���猩��index.html��
// /(index.js�̊K�w)+../(���̊K�w)+app(index.html������K�w)�ƂȂ�̂�
// �u/../app�v�Ƃ����������ɂȂ�H
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

//-------2/25�ǉ�--------------
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('OK');
});
//-----------------------------