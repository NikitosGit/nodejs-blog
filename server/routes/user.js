const express = require("express");
const models = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

router.post("/create", (req, res) => {
  //console.log(req.body);
  bcrypt.hash(req.body.password, null, null, function(err, hash) {
    models.User.create({
      email: req.body.email,
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
  });
});

router.post("/login", (req, res, next) => {
  models.User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).jsonp({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).jsonp({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).jsonp({
        error: err
      });
    });
});

module.exports = router;
