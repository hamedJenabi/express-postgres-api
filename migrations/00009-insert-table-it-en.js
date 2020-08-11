exports.up = async (sql) => {
  const iten = require('../assets/iten.json');
  const itenFirst = iten.slice(40, 20000);
  const itenSecond = iten.slice(20001, 40000);
  const itenThird = iten.slice(40001, 60000);
  const itenLast = iten.slice(60001, 80000);
  await sql`
     INSERT INTO it_en ${sql(itenFirst, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO it_en ${sql(itenSecond, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO it_en ${sql(itenThird, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO it_en ${sql(itenLast, 'word', 'detail', 'result')} `;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM it_en
`;
};
