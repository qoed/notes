import ErrorResponse from '../utils/errorResponse.js';
import { asyncHandler } from './async.js';

/**
 * @desc Check if user is authenticated
 */
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new ErrorResponse('Not authorized to access this route', 401));
});
