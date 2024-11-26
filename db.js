const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  // db.run(`DROP TABLE usuarios`);
  
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cpf TEXT UNIQUE,
    email TEXT,
    endereco TEXT,
    cep TEXT,
    tipo_sanguineo TEXT,
    senha TEXT
)`);

});

module.exports = db;
