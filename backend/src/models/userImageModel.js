import mongoose from "mongoose";

const userImagesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  imageType: {
    type: String,
    enum: ['profilePicture', 'coverPhoto'],
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  // dimensions: {
  //   width: Number,
  //   height: Number
  // },
  size: {
    type: Number
  }
  });

  const userImagesModel = mongoose.model('UserImage', userImagesSchema);

  export default userImagesModel
