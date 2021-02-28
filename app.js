const express = require('express');
const path = require('path');
const ejs = require("ejs");
const bodyParser = require('body-parser');

const index = require('./router/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ------req.body���g����悤�ɂ��邽�߂ɕK�v---------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//--------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// postgresql�Ɍq���̂ɕK�v�ȃ��W���[��
let { Client } = require('pg');

// �p�����[�^�[�͕ʂ̂Ƃ��납��Q�Ƃ���悤�ɂ���
let connection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'nakazondb',
    password: 'Inside601220',
    port: 5432
});

connection.connect();

app.listen(3000, () => {
    console.log('Start server port:3000')
});

app.post('/', (req, res) => {
    // �m�F�p�ɃR���\�[���ɏo�͂���
    console.log(req.body);  // login.js���瑗���Ă����f�[�^��req�̒��ɓ����Ă���

    let userId = req.body.userId;
    let password = req.body.password;

    let query = `SELECT COUNT(*) FROM users WHERE user_id = '${userId}' AND password = '${password}'`;

    connection.query(query, function (error, results, fields) {

        console.log(results.rows[0].count);

        let userCount = results.rows[0].count;

        if (userCount == 1) {
            // �Y�����[�U�[�����݂���ꍇ�Ausers/home.ejs�Ƀ��_�C���N�g����
            //res.redirect('/users/home');�@// ���̈�s�������node.js�������Ă��܂��B
        }   
        else {
            console.log("wrong UserID or Password");
            // login.js�ɊԈ���Ă��邱�Ƃ�`���鏈��������
            //res.redirect('/');
        }

        connection.end();
    });

    res.send('OK');
});

