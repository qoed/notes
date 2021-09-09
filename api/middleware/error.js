import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // console.log(err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource with id of ${err.value} cannot be found`;
    error = new ErrorResponse(message, 404);
  }
  // Mongoose duplicate key
  if (err.code === 11000) {
    const duplicateKeys = Object.keys(err.keyValue).map((val) => val);
    const message = `Duplicate value entered for fields: ${duplicateKeys}`;
    error = new ErrorResponse(message, 400);
  }
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Unknown Server Error' });
};

export { errorHandler };
