const fs = require("fs").promises;
const path = require("path");

module.exports = async (error) => {
  try {
    const getFileName = (filePath) => {
      const parsedPath = path.parse(filePath);
      return parsedPath.base;
    };

    const fileName = getFileName(
      error.fileName || error.sourceURL || error.stack || ""
    );

    const errorMessage = `[${new Date().toISOString()}] ${fileName}: ${
      error.message
    }\n`;

    // Caminho do diretório de logs
    const logsDir = path.join(__dirname, "logs");

    // Garante que o diretório de logs exista
    await fs.mkdir(logsDir, { recursive: true });

    // Caminho do arquivo de log
    const logFilePath = path.join(logsDir, "error.log");

    // Grava a mensagem de erro no arquivo de log
    await fs.appendFile(logFilePath, errorMessage);
  } catch (error) {
    console.error("Erro no handlerErrors:", error);
    return Promise.resolve(null);
  }
};
