const express = require("express");
const models = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");

router.post("/create", (req, res) => {
  //console.log(req.body);
  bcrypt.hash(req.body.password, null, null, function(err, hash) {
    models.User.create({
      login: req.body.username,
      password: hash
    })
      .then(user => {
        console.log(user);
        res.json({
          ok: true
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          ok: false,
          error: err
        });
      });
    //res.send(req.body.username);
  });
});

module.exports = router;
