const { resolve } = require("path");
const { Worker } = require("worker_threads");

const workerData = { value: 42, other: [1, 2, 3, 4, 5, 6, 7, 8, 9] };

const worker = new Worker(resolve(__dirname, "worker.js"), {
  workerData,
});

worker.on("message", (result) => {
  console.log(`Resultado do Worker: ${result}`);
});

worker.on("error", (error) => {
  console.error("Erro no Worker:", error);
});

worker.on("exit", (code) => {
  if (code !== 0) {
    console.error(`Worker parou com código de saída ${code}`);
  }
});
