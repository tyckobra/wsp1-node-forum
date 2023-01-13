
## Med node då

För databaskopplingen från node kommer du använda dig av mysql2. Det är en modul som du installerat tidigare.

För att komma åt databasinställningarna user/pass så kommer du att använda dotenv. Skapa en .env fil och lägg in dina inställningar där.

```bash
touch .env
```

`.env`
```
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
```

Läs in filen i din app.js

```js
require('dotenv').config();
```

Nu är du redo för att koppla upp dig mot databasen.

Vi kan göra detta i index routen för att testa / exempel.

```js
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
const promisePool = pool.promise();
```

Hämta sedan alla rader. Skicka till kliente som json.
Att hämta data från databasen är en asynkron process. Detta innebär att du måste använda dig av await eller .then() för att få tillbaka data. och funktionen måste vara async.

```js
router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM ja15forum");
    res.json({ rows });
});
```

Den data som hämtas från databasen är en array med objekt. Varje objekt är en rad i tabellen.
Den data som hämtas från databasen kan du sedan använda i en template för att skriva ut datan med html.

```js
    res.render('index.njk', {
        rows: rows,
        title: 'Forum',
    });
```

Uppdatera sedan index.njk

```html
<ul>
    {% for row in rows %}
        <li>
            {{ row | dump }}
        </li>
    {% endfor %}
</ul>
```

[Del 5](part-5.md)