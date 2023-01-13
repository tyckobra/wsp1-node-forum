# Del 2 - Databas

Kort SQL intro, saker du behöver förstå för att kunna arbeta med databasen.

- [ ] Skapa en databas och en tabell.

## SQL frågor

https://jens-andreasson.gitbook.io/webbserverprogrammering/databas/sql

Använd tableplus eller mysql klienten i terminalen.

### Skapa och använd en databas 

Om du kör på skolservern, kan du inte skapa en databas. Kör du mysql lokalt

```sql
CREATE DATABASE te20;
```

Använd databasen

```sql
USE te20;
```

### Skapa tabell

Din data i databasen sparas i en tabell.
Skapa en tabell för ditt forum. Använd dig av dina initialer + dagen du är född samt forum. Så för Jens blir det ja15forum.

För att skapa en tabell så behöver du även skapa en kolumn. Eftersom alla tabeller bör/måste/ska ha en id-kolumn är det en god ide att skapa den samtidigt som tabellen. Det går att skapa fler kolumner när tabellen skapas, men i det här fallet kommer du att lägga till dem i nästa steg.

```sql
CREATE TABLE ja15forum (id INT UNSIGNED AUTO_INCREMENT, PRIMARY KEY(id)) 
ENGINE = innodb
DEFAULT CHARSET = utf8mb4;
```

Du har nu skapat en tabell som heter ja15forum. I tabellen finns en kolumn som heter id. Den är av typen INT UNSIGNED och har AUTO_INCREMENT vilket betyder att den ökar med 1 för varje ny post. Den är också PRIMARY KEY vilket betyder att den är unik och inte kan vara samma som någon annan post.

[Del 3](part-3.md)