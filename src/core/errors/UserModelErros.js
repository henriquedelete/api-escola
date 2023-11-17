class EmailExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmailExistsError";
  }
}

class ValidationInternalErrors extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

module.exports = {
  EmailExistsError,
  ValidationInternalErrors,
};
