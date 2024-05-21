const ClientError = require("./ClientError");

class InputError extends ClientError {
  constructor(message, statusCode) {
    super(message);
    this.name = "InputError";
    this.statusCode = statusCode;
  }
}

module.exports = InputError;
