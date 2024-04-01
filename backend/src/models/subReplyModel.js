import mongoose from "mongoose"

const subReplySchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reply: { type: mongoose.Schema.Types.ObjectId, ref: 'Reply', required: true },
    parentReply: { type: mongoose.Schema.Types.ObjectId, ref: 'Reply' },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  const subReplyModel = mongoose.model("SubReply",subReplySchema)

  export default subReplyModel;