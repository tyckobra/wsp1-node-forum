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

router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM tb02forum");
  //  res.json({ rows });
    res.render('index.njk', {
    rows: rows,
    title: 'Forum',
});
});

router.get('/new', async function (req, res, next) {
    res.render('new.njk', {
        title: 'Nytt inlägg',
        users,
    });
});

module.exports = router;
