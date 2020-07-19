exports.up = async (sql) => {
  await sql`
	COPY en_de (word, detail, result) FROM '../en_de_dict.csv' 
	DELIMITER ';' CSV HEADER
`;
  await sql`
	COPY de_en (word, detail, result) FROM '../de_en_dict.csv' 
	DELIMITER ';' CSV HEADER
`;
};
exports.down = async (sql) => {
  // just in case...
};
