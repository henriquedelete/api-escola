const app = require("./src/App");

const portApp = Number(process.env.PORT) || 5000;

app.listen(portApp, () => {
  console.log(`RUNNING IN PORT ${portApp}`);
});
