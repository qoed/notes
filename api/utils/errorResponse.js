class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // map our message to built in message on Error
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
