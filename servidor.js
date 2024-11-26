const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Listar usuários
app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Adicionar usuário
app.post('/usuarios', (req, res) => {
  const { CPF, nome, email, senha } = req.body;
  db.run(
    'INSERT INTO usuarios (CPF, nome, email, senha) VALUES (?, ?, ?, ?)',
    [CPF, nome, email, senha],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Atualizar usuário
app.put('/usuarios/:id', (req, res) => {
  const { CPF, nome, email, senha } = req.body;
  const { id } = req.params;
  db.run(
    'UPDATE usuarios SET CPF = ?, nome = ?, email = ?, senha = ? WHERE id = ?',
    [CPF, nome, email, senha, id],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(204);
    }
  );
});

// Deletar usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM usuarios WHERE id = ?', id, function (err) {
    if (err) return res.status(500).send(err.message);
    res.sendStatus(204);
  });
});

app.post('/register', (req, res) => {
  const { nome, cpf, email, endereco, cep, tipo_sanguineo, senha } = req.body;

  const query = `INSERT INTO usuarios (nome, cpf, email, endereco, cep, tipo_sanguineo, senha) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // Tente inserir o usuário no banco
  db.run(query, [nome, cpf, email, endereco, cep, tipo_sanguineo, senha], function (err) {
      if (err) {
          console.error("Erro ao inserir usuário no banco de dados:", err.message);
          return res.status(500).json({ success: false, message: "Erro ao registrar usuário." });
      }

      console.log(`Usuário registrado com sucesso: ${nome}`);
      res.json({ success: true, message: "Usuário registrado com sucesso!" });
  });
});



// Rota para login
app.post('/login', (req, res) => {
  const { cpf, email, senha } = req.body;

  const query = `SELECT * FROM usuarios WHERE cpf = ? AND email = ? AND senha = ?`;
  
  db.get(query, [cpf, email, senha], (err, row) => {
      if (err) {
          console.error("Erro ao verificar credenciais:", err.message);
          return res.status(500).json({ success: false, message: "Erro no servidor" });
      }

      if (row) {
          // Usuário encontrado, login bem-sucedido
          res.json({ success: true, message: "Login bem-sucedido!" });
      } else {
          // Se as credenciais não corresponderem
          res.status(400).json({ success: false, message: "Dados de login inválidos." });
      }
  });
});


// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));