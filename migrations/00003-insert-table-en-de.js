

exports.up = async (sql) => {
  const ende = require('../assets/ende.json');
  const endeFirst = ende.slice(40, 20000);
  const endeSecond = ende.slice(20001, 40000);
  const endeThird = ende.slice(40001, 60000);
  const endeLast = ende.slice(60000);
  
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
	DELETE FROM en_de
`;
};
