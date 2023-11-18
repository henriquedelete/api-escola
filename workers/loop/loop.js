const { workerData, parentPort } = require("worker_threads");

function expensiveOperation(data) {
  const startTime = Date.now();
  let result = 0;
  for (let i = 0; i < data; i++) {
    result += i;
  }
  const endTime = Date.now();
  console.log(`Worker: Operação concluída em ${endTime - startTime} ms`);
  return result;
}

const result = expensiveOperation(workerData);
parentPort.postMessage(result);
