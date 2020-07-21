exports.up = async (sql) => {
  await sql`
		DROP TABLE es_en
	`;
};

exports.down = async (sql) => {
  // just in case...
};
