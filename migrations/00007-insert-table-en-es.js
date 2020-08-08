exports.up = async (sql) => {
  const enes = require('../assets/enes.json');
  const enesFirst = enes.slice(40, 20000);
  const enesSecond = enes.slice(20001, 40000);
  const enesThird = enes.slice(40001, 60000);
  const enesLast = enes.slice(60001, 80000);
  await sql`
     INSERT INTO en_es ${sql(enesFirst, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO en_es ${sql(enesSecond, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO en_es ${sql(enesThird, 'word', 'detail', 'result')} `,
    await sql`
     INSERT INTO en_es ${sql(enesLast, 'word', 'detail', 'result')} `;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM en_es
`;
};
