exports.up = async (sql) => {
  const esen = require('../assets/esen.json');
  const esenFirst = esen.slice(40, 20000);
  const esenSecond = esen.slice(20001, 40000);
  const esenThird = esen.slice(40001, 60000);
  const esenLast = esen.slice(60001, 80000 );
  // const fs = require('fs');
  // const path = require('path');
  // const fastcsv = require('fast-csv');
  // let stream = fs.createReadStream(
  //   path.resolve(__dirname, '../assets', 'en_de_dict.csv'),
  // );
  // let enDE = [];
  // let enDEStream = fastcsv
  //   .parse({ delimiter: ';' }, { headers: true })
  //   .on('data', function (data) {
  //     enDE.push(data);
  //   })
  //   .on('end', function () {
  //     // remove the first line: header
  //     enDE.shift();
  //     console.log(enDE);
  //     const objects = enDE.map((row) => {
  //       let value1 = row[0];
  //       let value2 = row[1];
  //       let value3 = row[2];
  //       const object = {
  //         word: value1,
  //         detail: value2,
  //         result: value3,
  //       };
  //       return object;
  //     });
  //     sql`
  //     INSERT INTO en_de ${sql(
  //       [objects[10]],
  //       'word',
  //       'detail',
  //       'result',
  //     )} `.catch((error) => console.error(error));
  //   });
	// stream.pipe(enDEStream);
	await sql`
	CREATE TABLE es_en(
		id SERIAL PRIMARY KEY,
		word VARCHAR,
		detail VARCHAR,
		result VARCHAR
	)
`;
  await sql`
     INSERT INTO de_en ${sql(esenFirst, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO de_en ${sql(esenSecond, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO de_en ${sql(esenThird, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO de_en ${sql(esenLast, 'word', 'detail', 'result')} `;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE en_de
`;
};
