const express = require("express");
//const models = require("../models");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
