import mongoose from "mongoose"

const postVideosSchema = new mongoose.Schema({
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    duration: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  });

  const postVideosModel = mongoose.model('PostVideo', postVideosSchema);

  export default postVideosModel
