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

// Skapa en ny författare om den inte finns men du behöver kontrollera om användare finns!
let [user] = await promisePool.query('SELECT * FROM tb02forum WHERE id = ?', [authorId]);
if (!user) {
    user = await promisePool.query('INSERT INTO tb02forum (name) VALUES (?)', [authorName]);
}

// user.insertId bör innehålla det nya ID:t för författaren
const userId = user.insertId || user[0].id;

// kör frågan för att skapa ett nytt inlägg
const [rows] = await promisePool.query('INSERT INTO tb02forum (authorId, title, content) VALUES (?, ?, ?)', [userId, title, content]);

router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM tb02forum");
  //  res.json({ rows });
    res.render('index.njk', {
    rows: rows,
    title: 'Forum',
});

router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query('INSERT INTO tb02forum (authorId, title, content) VALUES (?, ?, ?)', [1, title, content]);
    res.render('index.njk', {
    rows: rows,
    title: 'Forum',
});

router.get('/new', async function (req, res, next) {
    const [users] = await promisePool.query('SELECT * FROM tb02forum');
    res.render('new.njk', {
        title: 'Nytt inlägg',
        users,
    });
});

module.exports = router;
