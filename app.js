require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);
require("./config/session.config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "PokeRed";

app.locals.appTitle = `${capitalized(projectName)} `;

const index = require("./routes/index.routes");
app.use("/", index);

require("./error-handling")(app);

module.exports = app;
