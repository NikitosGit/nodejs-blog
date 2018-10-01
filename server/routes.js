const models = require("./models");
const bcrypt = require("bcrypt-nodejs");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/register", (req, res) => {
    res.send("Hello1");
  });

  app.post("/login", (req, res) => {
    res.send("Hello2");
  });

  app.post("/user/create", (req, res) => {
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
};
