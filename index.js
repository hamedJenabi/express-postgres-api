// require('./extractHerokuDatabaseEnvVars')();
require('dotenv').config();
const express = require('express');
const app = express();
const postgres = require('postgres');
const port = process.env.port || 5432;
const sql =
  process.env.NODE_ENV === 'production'
    ? postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

/****** dictionary queries to choose the tables(object.key) *********/

const dictQueries = {
  'en-de': (wordRequest) => sql`
  SELECT * FROM en_de WHERE LOWER(word) LIKE LOWER(${`${wordRequest}`})
`,
  'de-en': (wordRequest) => sql`
  SELECT * FROM de_en WHERE LOWER(word) LIKE LOWER(${`${wordRequest}`})
`,
};

/****** English <-> German Endpoint *********/

app.get('/api/popword/:dict/:word', async (req, res) => {
  const query = dictQueries[req.params.dict];

  if (!query) {
    res.status(500).send('dictionary not found');
    return;
  }
  const answer = await query(req.params.word);

  if (answer === 'undefined') {
    res.status(404).send('answer not found');
  } else {
    res.send(answer);
  }
});

app.get('/', async (req, res) => {
  res.send(`hello world - test API: `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
