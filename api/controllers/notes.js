import { asyncHandler } from '../middleware/async.js';
import Note from '../models/Note.js';

import ErrorResponse from '../utils/errorResponse.js';

/**
 * @desc    Get notes
 * @router  GET /api/v1/notes
 * @access  Private
 */
export const getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find({ createdBy: req.user.id }).sort('-updatedOn');

  res.status(200).json({ data: notes });
});

/**
 * @desc    Get note
 * @router  GET /api/v1/notes/:id
 * @access  Private
 */
export const getNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findById(id);

  if (!note || note.createdBy.toString() !== req.user.id) {
    return next(new ErrorResponse(`Resource with id ${id} cannot be found`, 404));
  }

  res.status(200).json({ data: note });
});

/**
 * @desc    Create note
 * @router  POST /api/v1/notes
 * @access  Private
 */
export const createNote = asyncHandler(async (req, res, next) => {
  const { content } = req.body;

  const note = await Note.create({
    content,
    createdBy: req.user.id,
  });

  res.status(201).json({ data: note });
});

/**
 * @desc    Update note
 * @router  PATCH /api/v1/notes/:id
 * @access  Private
 */
export const updateNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { content, pinned } = req.body;

  let note = await Note.findById(id);

  if (!note || note.createdBy.toString() !== req.user.id) {
    return next(new ErrorResponse(`Note with id ${id} cannot be found`, 404));
  }

  note = await Note.findByIdAndUpdate(
    id,
    {
      content,
      pinned,
      updatedOn: new Date().toISOString(),
    },
    { runValidators: true, new: true }
  );

  res.status(200).json({ data: note });
});

/**
 * @desc    Delete note
 * @router  DELETE /api/v1/notes/:id
 * @access  Private
 */
export const deleteNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let note = await Note.findById(id);

  if (!note || note.createdBy.toString() !== req.user.id) {
    return next(new ErrorResponse(`Note with id ${id} cannot be found`, 404));
  }

  await Note.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: `Deleted note with id: ${id}` });
});
