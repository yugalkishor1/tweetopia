import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    retweetData: {
      type: new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
      }),
      required: false
    },
    media: [{ type: String }], // URLs or file paths for images, videos, etc.
    hashtags: [{ type: String }],
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  const postModel = mongoose.model("Post",postSchema)

  export default postModel;