const app = require("express")();
const consign = require("consign");
const knex = require("knex");
const knexfile = require("../knexfile");
// const knekLogger = require("knex-logger");

//TODO criar chaveamento dinâmico
app.db = knex(knexfile.test);

// app.use(knekLogger(app.db));

consign({ cwd: "src", verbose: false })
  .include("./config/middlewares.js")
  .then("./services")
  .then("./routes")
  .then("./config/routes.js")
  .into(app);

// app.db
//   .on("query", query => {
//     console.log({
//       sql: query.sql,
//       binding: query.bindings ? query.bindings.join(",") : ""
//     });
//   })
//   .on("query-response", response => {
//     console.log(response);
//   })
//   .on("error", error => console.log(error));

app.get("/", (req, res) => {
  res.status(200).send();
});

module.exports = app;
