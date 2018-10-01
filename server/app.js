const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

app.use(morgan("combined"));
app.use(bodyParser.json());

//require("./routes")(app);

app.use("/post", postRoutes);
app.use("/user", userRoutes);

module.exports = app;
