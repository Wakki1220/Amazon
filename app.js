const express = require('express');
const path = require('path');
const ejs = require("ejs");
const bodyParser = require('body-parser');
const config = require('./config');

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
const { Client } = require('pg');

app.listen(3000, () => {
    console.log('Start server port:3000')
});

app.post('/', (req, res) => {
    // DBに繋ぐための準備
    let connection = new Client({
        user: config.user,
        host: config.host,
        database: config.database,
        password: config.password,
        port: config.port
    });

    connection.connect();

    // 確認用にコンソールに出力する
    console.log(req.body);  // login.jsから送られてきたデータがreqの中に入っている

    let userId = req.body.userId;
    let password = req.body.password;

    let query = `SELECT COUNT(*) FROM users WHERE user_id = '${userId}' AND password = '${password}'`;

    connection.query(query, function (error, results, fields) {

        console.log(results.rows[0].count);

        let userCount = results.rows[0].count;

        if (userCount == 1) {
            res.send('OK');
        }   
        else {
            console.log("Wrong UserID or Password");
            res.send('NG');
        }
        connection.end();
    });
    
    //res.send('OK!!!');　←この一文を書くとres.send('OK')が上書きされてしまうので削除
});

