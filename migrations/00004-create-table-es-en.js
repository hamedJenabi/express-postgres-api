exports.up = async (sql) => {
  
  await sql`
	CREATE TABLE es_en(
		id SERIAL PRIMARY KEY,
		word VARCHAR,
		detail VARCHAR,
		result VARCHAR
	)
`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE es_en
`;
};
