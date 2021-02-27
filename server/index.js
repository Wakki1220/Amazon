const express = require('express');
const app = express();

// �p�X�w��p���W���[��
const path = require('path');

// ------req.body���g����悤�ɂ��邽�߂ɕK�v---------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//--------------------------------------------------

// public�f�B���N�g���Ƀ��[�e�B���O
app.use(express.static('public'));

// postgresql�Ɍq���̂ɕK�v�ȃ��W���[��
let { Client } = require('pg');

// �p�����[�^�[�͕ʂ̂Ƃ��납��Q�Ƃ���悤�ɂ���
let connection = new Client({
    user: '',
    host: 'localhost',
    database: '',
    password: '',
    port: 5432
});

connection.connect();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Start server port:3000')
});

//-------------------------------------------------------------------------------------------------------------
app.post('/server/index.js', (req, res) => {
    // �m�F�p�ɃR���\�[���ɏo�͂���
    console.log(req.body);  // login.js���瑗���Ă����f�[�^��req�̒��ɓ����Ă���

    let userId = req.body.userId;
    let password = req.body.password;

    let query = `SELECT COUNT(*) FROM users WHERE user_id = '${userId}' AND password = '${password}'`;

    connection.query(query, function (error, results, fields) {

        console.log(results.rows[0].count);

        let userCount = results.rows[0].count;

        if (userCount == 1) {
            // top.html�Ƀ��_�C���N�g���鏈��������
            //res.redirect('/user');
        }   
        else {
            console.log("wrong UserID or Password");
            // login.js�ɊԈ���Ă��邱�Ƃ�`���鏈��������

        }

        connection.end();
    });

    res.send('OK');
});
//-----------------------------

