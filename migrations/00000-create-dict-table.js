exports.up = async (sql) => {
  await sql`
	CREATE TABLE en_de(
		id SERIAL PRIMARY KEY,
		word VARCHAR,
		detail VARCHAR,
		result VARCHAR
	)
`;
  await sql`
	CREATE TABLE de_en(
		id SERIAL PRIMARY KEY,
		word VARCHAR,
		detail VARCHAR,
		result VARCHAR
	)
`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE en_de
`;
};
