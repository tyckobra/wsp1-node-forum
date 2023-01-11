# Node w. database

## Install

```bash
npm i express nodemon dotenv mysql2
```

## SQL frågor

https://jens-andreasson.gitbook.io/webbserverprogrammering/databas/sql

Använd tableplus eller mysql klienten i terminalen.

Om du kör på skolservern, kan du inte skapa en databas. Kör du mysql lokalt

```sql
CREATE DATABASE te20;
```

Använd databasen

```sql
USE te20;
```

Din data i databasen sparas i en tabell.
Skapa en tabell för ditt forum. Använd dig av dina initialer + dagen du är född samt forum. Så för Jens blir det ja15forum.

För att skapa en tabell så behöver du även skapa en kolumn. Eftersom alla tabeller bör/måste/ska ha en id-kolumn är det en god ide att skapa den samtidigt som tabellen. Det går att skapa fler kolumner när tabellen skapas, men i det här fallet kommer du att lägga till dem i nästa steg.

```sql
CREATE TABLE ja15forum (id INT UNSIGNED AUTO_INCREMENT, PRIMARY KEY(id)) 
ENGINE = innodb
DEFAULT CHARSET = utf8mb4;
```

Du har nu skapat en tabell som heter ja15forum. I tabellen finns en kolumn som heter id. Den är av typen INT UNSIGNED och har AUTO_INCREMENT vilket betyder att den ökar med 1 för varje ny post. Den är också PRIMARY KEY vilket betyder att den är unik och inte kan vara samma som någon annan post.

### Vilka kolumner behöver vi?

För en forum-post vill vi ha ett antal kolumner. Vem som har skrivit posten, titeln, innehållet och när posten skapades.

### Vilka datatyper behöver vi?

författare, ett namn varchar(255)
titel, text, men inte för lång varchar(255)
innehåll, text
skapad, datum

För att ändra i tabellen så behöver vi skriva SQL frågor för att göra detta.

```sql
ALTER TABLE ja15forum ADD author VARCHAR(255) NOT NULL;
ALTER TABLE ja15forum ADD title VARCHAR(255) NOT NULL;
ALTER TABLE ja15forum ADD content TEXT NOT NULL;
ALTER TABLE ja15forum ADD createdAt DATETIME DEFAULT CURRENT_TIMESTAMP;
```

För att inspektera tabellen med sql så kan du använda 

```sql
DESCRIBE ja15forum;
```

![Table image](docs/assets/describe-table.png)

Tabellen för forumet är nu klar och nästa steg är att fylla den med data.

### Skapa data

Skapa data, använd antingen Tableplus eller så skriver du sql-fråga.
Testa båda!

```sql
INSERT INTO ja15forum (author, title, content) VALUES ('Jens', 'Hej', 'Detta är ett test');
```

Visa data.

```sql
SELECT * FROM ja15forum;
```

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