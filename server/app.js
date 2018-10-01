const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");

app.use(morgan("combined"));
app.use(bodyParser.json());

require("./routes")(app);

module.exports = app;
