const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Middleware para analisar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Lista para armazenar os times cadastrados
let times = [];

// Rota para exibir o formulário de cadastro
app.get('/', (req, res) => {
  let listaTimes = times.map(time => `
    <li>${time.nome} - ${time.cidade} - Time do Coração: ${time.timeCoracao}</li>
  `).join('');

  res.send(`
    <h1>Cadastro de Times</h1>
    <form action="/cadastro" method="POST">
      <label>Nome: <input type="text" name="nome"></label><br><br>
      <label>Data de Nascimento: <input type="date" name="dataNascimento"></label><br><br>
      <label>Cidade: <input type="text" name="cidade"></label><br><br>
      <label>Time do Coração: <input type="text" name="timeCoracao"></label><br><br>
      <button type="submit">Cadastrar</button>
    </form>
    <h2>Times Cadastrados</h2>
    <ul>${listaTimes}</ul>
  `);
});

// Rota para processar o cadastro do time
app.post('/cadastro', (req, res) => {
  const { nome, dataNascimento, cidade, timeCoracao } = req.body;

  // Validação dos campos
  let erros = [];

  if (!nome) erros.push('Nome é obrigatório.');
  if (!dataNascimento) erros.push('Data de Nascimento é obrigatória.');
  if (!cidade) erros.push('Cidade é obrigatória.');
  if (!timeCoracao) erros.push('Time do Coração é obrigatório.');

  if (erros.length > 0) {
    // Exibe os erros e o formulário novamente
    let listaTimes = times.map(time => `
      <li>${time.nome} - ${time.cidade} - Time do Coração: ${time.timeCoracao}</li>
    `).join('');
    res.send(`
      <h1>Cadastro de Times</h1>
      <p style="color: red;">${erros.join('<br>')}</p>
      <form action="/cadastro" method="POST">
        <label>Nome: <input type="text" name="nome"></label><br><br>
        <label>Data de Nascimento: <input type="date" name="dataNascimento"></label><br><br>
        <label>Cidade: <input type="text" name="cidade"></label><br><br>
        <label>Time do Coração: <input type="text" name="timeCoracao"></label><br><br>
        <button type="submit">Cadastrar</button>
      </form>
      <h2>Times Cadastrados</h2>
      <ul>${listaTimes}</ul>
    `);
  } else {
    // Adiciona o time à lista
    times.push({ nome, dataNascimento, cidade, timeCoracao });

    // Redireciona de volta ao formulário com a lista atualizada
    res.redirect('/');
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
