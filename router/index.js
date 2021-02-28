const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login.ejs');
});

router.post('/users/home', (req, res) => {
    res.render('users/home.ejs');
});

module.exports = router;