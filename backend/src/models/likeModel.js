import mongoose from 'mongooose';

const likeSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    entity: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'entityType'
    },
    entityType: {
      type: String,
      required: true,
      enum: ['Post', 'Comment']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });