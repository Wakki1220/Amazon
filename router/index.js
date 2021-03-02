const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/users/home', (req, res) => {
    res.render('users/home');
});

router.post('/users/home', (req, res) => {
    res.redirect('users/home');
});

router.get('/users/add', (req, res) => {
    res.render('users/add');
});

module.exports = router;