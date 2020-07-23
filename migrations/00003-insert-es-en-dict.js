exports.up = async (sql) => {
  const esen = require('../assets/esen.json');
  const esenFirst = esen.slice(40, 20000);
  const esenSecond = esen.slice(20001, 40000);
  const esenThird = esen.slice(40001, 60000);
  const esenLast = esen.slice(60001, 80000);

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
