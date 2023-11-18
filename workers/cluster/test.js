const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  console.log(`Mestre ${process.pid} está executando`);

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} morreu`);
  });
} else {
  console.log(`Worker ${process.pid} está executando`);

  setInterval(() => {
    console.log(`Worker ${process.pid} está fazendo algo`);
  }, 2000);
}
