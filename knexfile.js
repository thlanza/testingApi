module.exports = {
  test: {
    client: "pg",
    version: "9.6",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "lanza1",
      database: "barriga"
    },
    migrations: {
      directory: "src/migrations"
    }
  }
};
