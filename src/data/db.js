const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Conectado com o DB");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), 
    password VARCHAR(255), poke1 VARCHAR(50), poke2 VARCHAR(50), poke3 VARCHAR(50), poke4 VARCHAR(50), poke5 VARCHAR(50), poke6 VARCHAR(50))`,
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Tabela de usuários criada!");
    }
  );
});

module.exports = db;
