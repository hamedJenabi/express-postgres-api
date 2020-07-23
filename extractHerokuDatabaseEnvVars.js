module.exports = function extractHerokuDatabaseEnvVars() {
  if (process.env.HEROKU_POSTGRESQL_COPPER) {
    const url = require('url');

    const { hostname, pathname, auth } = url.parse(
      process.env.HEROKU_POSTGRESQL_COPPER,
    );

    const [username, password] = auth.split(':');

    process.env.PGHOST = hostname;
    process.env.PGDATABASE = pathname.slice(1);
    process.env.PGUSERNAME = username;
    process.env.PGPASSWORD = password;
  }
};
