import cheerio from 'cheerio';
import express from 'express';
import fetch from 'node-fetch';// Módulo para fazer requisições HTTP

const app = express();
const port = 3000;

app.use(express.static('build'));

app.get('/verificarPagina', async (req, res) => {
  const url = req.query.url; // URL da página da web a ser verificada

  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(404).send('Página não encontrada.');
      return;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Verifique se existem elementos com a classe 'titulo-leitura'
    const elementosComClasse = $('.titulo-leitura');
    if (elementosComClasse.length > 0) {
      res.status(200).send('A classe CSS "titulo-leitura" existe na página.');
    } else {
      res.status(404).send('A classe CSS "titulo-leitura" não foi encontrada na página.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao verificar a página.');
  }
});

app.listen(port, () => {
  console.log(`Servidor proxy em execução na porta ${port}`);
});
