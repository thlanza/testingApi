const bodyParser = require("body-parser");
// const knekLogger = require("knex-logger");

module.exports = app => {
  app.use(bodyParser.json());
  // app.use(knekLogger(app.db));
};
