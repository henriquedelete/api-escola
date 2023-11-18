const { parentPort, workerData } = require("worker_threads");

function performTask(data) {
  // Implemente a lógica do trabalho a ser realizado pelo Worker
  console.log(data);
  const result = data.value * 2;
  return result;
}

const result = performTask(workerData);
parentPort.postMessage(result);
