const express = require('express');
const app = express();

// パス指定用モジュール
const path = require('path');

// ------req.bodyが使えるようにするために必要---------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//--------------------------------------------------

// publicディレクトリにルーティング
app.use(express.static('public'));

// postgresqlに繋ぐのに必要なモジュール
let { Client } = require('pg');

// パラメーターは別のところから参照するようにする
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
    // 確認用にコンソールに出力する
    console.log(req.body);  // login.jsから送られてきたデータがreqの中に入っている

    let userId = req.body.userId;
    let password = req.body.password;

    let query = `SELECT COUNT(*) FROM users WHERE user_id = '${userId}' AND password = '${password}'`;

    connection.query(query, function (error, results, fields) {

        console.log(results.rows[0].count);

        let userCount = results.rows[0].count;

        if (userCount == 1) {
            // top.htmlにリダイレクトする処理を書く
            //res.redirect('/user');
        }   
        else {
            console.log("wrong UserID or Password");
            // login.jsに間違っていることを伝える処理を書く

        }

        connection.end();
    });

    res.send('OK');
});
//-----------------------------

