const express = require('express');
const path = require('path');
const ejs = require("ejs");
const bodyParser = require('body-parser');

const index = require('./router/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ------req.bodyが使えるようにするために必要---------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//--------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// postgresqlに繋ぐのに必要なモジュール
let { Client } = require('pg');

// パラメーターは別のところから参照するようにする
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
    // 確認用にコンソールに出力する
    console.log(req.body);  // login.jsから送られてきたデータがreqの中に入っている

    let userId = req.body.userId;
    let password = req.body.password;

    let query = `SELECT COUNT(*) FROM users WHERE user_id = '${userId}' AND password = '${password}'`;

    connection.query(query, function (error, results, fields) {

        console.log(results.rows[0].count);

        let userCount = results.rows[0].count;

        if (userCount == 1) {
            // 該当ユーザーが存在する場合、users/home.ejsにリダイレクトする
            //res.redirect('/users/home');　// この一行を入れるとnode.jsが落ちてしまう。
        }   
        else {
            console.log("wrong UserID or Password");
            // login.jsに間違っていることを伝える処理を書く
            //res.redirect('/');
        }

        connection.end();
    });

    res.send('OK');
});

