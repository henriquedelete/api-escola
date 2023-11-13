const { portApp } = require("./serverOptions");

const whitelist = [`http://localhost:${portApp}`]; // Adicione outras origens conforme necessário

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
