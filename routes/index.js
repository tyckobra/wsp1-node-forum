const express = require('express');
const router = express.Router();

const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
const promisePool = pool.promise();

router.get('/', async function (req, res, next) {
    const [rows,fields] = await promisePool.query("SELECT * FROM ja15forum");
    res.json({ rows, fields });
    // res.render('index.njk', {
    //     message: 'Hello world! Now with a route file!',
    //     title: 'Nunjucks hello world ',
    // });
});

module.exports = router;
