import mongoose from "mongoose"

const postImagesSchema = new mongoose.Schema({
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'postModel',
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

  const postImagesModel = mongoose.model('postImagesModel', postImagesSchema) ;
  export default postImagesModel

