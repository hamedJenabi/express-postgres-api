exports.up = async (sql) => {
  
  await sql`
	CREATE TABLE en_es(
		id SERIAL PRIMARY KEY,
		word VARCHAR,
		detail VARCHAR,
		result VARCHAR
	)
`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE en_es
`;
};
