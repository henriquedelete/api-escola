require("dotenv").config();
const app = require("./src/App");
const serverOptions = require("./src/config/serverOptions");

app.listen(serverOptions.portApp, () => {
  console.log(`RUNNING IN PORT ${serverOptions.portApp}`);
});
