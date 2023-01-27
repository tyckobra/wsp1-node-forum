const express = require('express');
const router = express.Router();
const { DateTime } = require("luxon");

const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
const promisePool = pool.promise();

router.post('/new', async function (req, res, next) {
    const { author, title, content } = req.body;
    const [rows] = await promisePool.query("INSERT INTO tb02forum (author, title, content) VALUES (?, ?, ?)", [author, title, content]);
    res.redirect('/');
    res.render('gringos.njk', {
        rows: rows,
        title: 'Gringos',
    });
});

module.exports = router;
