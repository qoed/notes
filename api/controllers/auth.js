import User from '../models/User.js';
import Image from '../models/Image.js';
import Note from '../models/Note.js';
import fs from 'fs';
import { join } from 'path';
import { asyncHandler } from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

/**
 * @desc    Logout user
 * @router  GET /api/v1/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
  }

  res.status(200).json({ success: true, data: {} });
});

/**
 * @desc    Get current logged in user
 * @router  GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
});

/**
 * @desc    Delete current logged in user and the user's notes and images
 * @router  DELETE /api/v1/auth/delete
 * @access  Private
 */
export const deleteUser = asyncHandler(async (req, res, next) => {
  // find all user images
  const images = await Image.find({ createdBy: req.user.id });
  // delete them from the server
  images.forEach((image) => {
    fs.rmSync(join(process.cwd(), image.path));
  });
  // delete them from the database
  await Image.deleteMany({ createdBy: req.user.id });

  // find all user notes - not necessary
  // const notes = await Note.find({ createdBy: req.user.id });

  // delete user notes from the database
  await Note.deleteMany({ createdBy: req.user.id });
  // delete the user from database
  await User.findByIdAndDelete(req.user.id);
  // call logout to end the current session
  req.logout();
  res.status(200).json({ success: true, data: req.user });
});
