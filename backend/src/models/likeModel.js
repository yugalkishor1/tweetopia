import mongoose from 'mongooose';

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likedItem: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'likedItemType'
  },
  likedItemType: {
    type: String,
    required: true,
    enum: ['Post', 'Comment']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const likeModel = mongoose.model("Like", likeSchema)

export default likeModel;