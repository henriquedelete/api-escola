const { resolve } = require("path");
const { Worker } = require("worker_threads");

const startTime = Date.now();

const worker = new Worker(resolve(__dirname, "loop.js"), {
  workerData: 80000,
});

worker.on("message", (result) => {
  const endTime = Date.now();
  console.log(`Principal: Resultado do worker: ${result}`);
  console.log(`Principal: Operação total levou ${endTime - startTime} ms`);
  worker.terminate();
});

worker.on("error", (error) => {
  console.error("Erro no worker:", error);
});

worker.on("exit", (code) => {
  if (code !== 0) {
    console.error(`Worker parou com código de saída ${code}`);
  }
});
