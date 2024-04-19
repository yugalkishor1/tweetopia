import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  retweetData: {
    type: new mongoose.Schema({
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
      post: { type: mongoose.Schema.Types.ObjectId, ref: 'postModel' }
    }),
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'postImagesModel'
  }],
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'postVideosModel'
  }],
  hashtags: [{ type: String }],
  mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }]
  });
  
  const postModel = mongoose.model("postModel",postSchema)
  export default postModel;