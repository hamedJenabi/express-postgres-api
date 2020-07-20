exports.up = async (sql) => {
  const ende = require('../assets/ende.json');
  const endeFirst = ende.slice(40, 20000);
  const endeSecond = ende.slice(20001, 40000);
  const endeThird = ende.slice(40001, 60000);
  const endeLast = ende.slice(60000);
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
     INSERT INTO en_de ${sql(endeFirst, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO en_de ${sql(endeSecond, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO en_de ${sql(endeThird, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO en_de ${sql(endeLast, 'word', 'detail', 'result')} `;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE en_de
`;
};
