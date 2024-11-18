const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Porta do servidor
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));

let times = [];

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

app.post('/cadastro', (req, res) => {
  const { nome, dataNascimento, cidade, timeCoracao } = req.body;

  let erros = [];

  if (!nome) erros.push('Nome é obrigatório.');
  if (!dataNascimento) erros.push('Data de Nascimento é obrigatória.');
  if (!cidade) erros.push('Cidade é obrigatória.');
  if (!timeCoracao) erros.push('Time do Coração é obrigatório.');

  if (erros.length > 0) {
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
   
    times.push({ nome, dataNascimento, cidade, timeCoracao });

    res.redirect('/');
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
