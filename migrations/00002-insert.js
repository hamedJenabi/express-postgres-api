exports.up = async (sql) => {
  const deen = require('../assets/deen.json');
  const deenFirst = deen.slice(40, 20000);
  const deenSecond = deen.slice(20001, 40000);
  const deenThird = deen.slice(40001, 60000);
  const deenLast = deen.slice(60001, 80000);

  await sql`
     INSERT INTO de_en ${sql(deenFirst, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO de_en ${sql(deenSecond, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO de_en ${sql(deenThird, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO de_en ${sql(deenLast, 'word', 'detail', 'result')} `;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE de_en
`;
};
