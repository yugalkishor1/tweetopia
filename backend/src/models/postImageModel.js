import mongoose from "mongoose"

const postImagesSchema = new mongoose.Schema({
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    dimensions: {
      width: Number,
      height: Number
    },
    size: {
      type: Number
    }
  });

  const postImagesModel = mongoose.model('PostImage', postImagesSchema) ;
  export default postImagesModel

