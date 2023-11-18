const { resolve } = require("path");
const { Worker } = require("worker_threads");

const worker = new Worker(resolve(__dirname, "continuous.js"));

worker.on("error", (error) => {
  console.error("Erro no worker:", error);
});

worker.on("exit", (code) => {
  if (code !== 0) {
    console.error(`Worker parou com código de saída ${code}`);
  }
});

worker.on("message", (msg) => {
  console.log(`msg dentro do main => ${msg}`);
});
