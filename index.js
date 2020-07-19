require('dotenv').config();
const express = require('express');
const app = express();
const postgres = require('postgres');
const port = process.env.post || 3000;
const sql =
  // process.env.NODE_ENV === 'production'
  //   ? postgres({ ssl: { rejectUnauthorized: false } }) :
  postgres();

/****** dictionary queries to choose the tables(object.key) *********/

const dictQueries = {
  'en-de': (wordRequest) => sql`
  SELECT * FROM en-de WHERE LOWER(word) LIKE LOWER(${`${wordRequest}`})
`,
  'de-en': (wordRequest) => sql`
  SELECT * FROM de-en WHERE LOWER(word) LIKE LOWER(${`${wordRequest}`})
`,
};

/******parsing EN_DE  **/

const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

let stream = fs.createReadStream(
  path.resolve(__dirname, 'assets', 'en_de_dict.csv'),
);
let enDE = [];
let enDEStream = fastcsv
  .parse({ delimiter: ';' }, { headers: true })
  .on('data', function (data) {
    enDE.push(data);
  })
  .on('end', function () {
    // remove the first line: header
    enDE.shift();
    enDE.map((row) => {
      let value1 = row[0];
      let value2 = row[1];
      let value3 = row[2];
      sql`
      INSERT INTO en_de (word, detail, result) VALUES(${value1}, ${value2}, ${value3}) `;
    });
  });

stream.pipe(enDEStream);

/***** parsing DE_EN *********/

let streamDE = fs.createReadStream(
  path.resolve(__dirname, 'assets', 'de_en_dict.csv'),
);
let deEn = [];
let deEnStream = fastcsv
  .parse({ delimiter: ';' }, { headers: true })
  .on('data', function (data) {
    deEn.push(data);
  })
  .on('end', function () {
    // remove the first line: header
    deEn.shift();
    deEn.map((row) => {
      let value1 = row[0];
      let value2 = row[1];
      let value3 = row[2];
      sql`
      INSERT INTO de_en (word, detail, result) VALUES(${value1}, ${value2}, ${value3}) `;
    });
  });

streamDE.pipe(deEnStream);

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
