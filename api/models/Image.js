import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, 'Please add a filename'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    path: {
      type: String,
      required: [true, 'Please add a path'],
    },
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    updatedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export default mongoose.model('Image', ImageSchema);
