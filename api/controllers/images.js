import fs from 'fs';
import path, { join } from 'path';
import crypto from 'crypto';
import ErrorResponse from '../utils/errorResponse.js';
import { asyncHandler } from '../middleware/async.js';
import Image from '../models/Image.js';

/**
 * @desc    Get images
 * @router  GET /api/v1/images
 * @access  Private
 */
export const getImages = asyncHandler(async (req, res, next) => {
  const images = await Image.find({ createdBy: req.user.id });
  res.status(200).json({ data: images });
});

/**
 * @desc    Delete image
 * @router  DELETE /api/v1/images/:id
 * @access  Private
 */
export const deleteImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findById(req.params.id);

  if (!image || image.createdBy.toString() !== req.user.id) {
    return next(new ErrorResponse(`Image with id of ${req.params.id} cannot be found`, 404));
  }

  fs.rmSync(join(process.cwd(), image.path));

  image.remove();

  res.status(200).json({
    success: true,
    data: `Image was successfully deleted`,
  });
});

/**
 * @desc    Create image
 * @router  POST /api/v1/images
 * @access  Private
 */
export const createImage = asyncHandler(async (req, res, next) => {
  const file = req.files.file;
  file.name = `${crypto.randomBytes(12).toString('hex')}${path.parse(file.name).ext}`;

  const filePath = `static/images/${file.name}`;

  file.mv(filePath, async (err) => {
    if (err) {
      return next(new ErrorResponse(`Image upload failed`, 500));
    }

    const image = await Image.create({
      filename: file.name,
      path: filePath,
      slug: `files/images/${file.name}`,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, data: image });
  });
});
