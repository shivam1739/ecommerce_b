require("dotenv").config();

module.exports = {
  development: {
    username: MYSQL_ADDON_USER,
    password: MYSQL_ADDON_PASSWORD,
    database: MYSQL_ADDON_DB,
    host: MYSQL_ADDON_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
