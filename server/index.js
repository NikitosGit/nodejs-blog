const app = require("./app");
const config = require("./config");
const database = require("./database");

database()
  .then(info => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}!`);
    });
  })
  .catch(error => {
    console.error(`Unable to connect to database -> ${error.message}`);
    process.exit(1);
  });
