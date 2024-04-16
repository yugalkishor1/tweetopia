import mongoose from "mongoose"

const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  const replyModel = mongoose.model("Reply",replySchema)

  export default replyModel;