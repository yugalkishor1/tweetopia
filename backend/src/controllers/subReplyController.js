import SubReply from '../models/subReplyModel.js';
import Reply from '../models/replyModel.js';
import User from '../models/userModel.js';
import Like from '../models/likeModel.js';

// Create a new sub-reply
export const createSubReply = async (req, res, next) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    const replyId = req.params.replyId;

    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    const newSubReply = new SubReply({
      text,
      user: userId,
      reply: replyId,
      parentReply: reply.parentReply || replyId,
    });

    const savedSubReply = await newSubReply.save();
    reply.replies.push(savedSubReply._id);
    await reply.save();

    res.status(201).json(savedSubReply);
  } catch (err) {
    next(err);
  }
};

// Get all sub-replies for a reply
export const getSubReplies = async (req, res, next) => {
  try {
    const replyId = req.params.replyId;

    const reply = await Reply.findById(replyId).populate({
      path: 'replies',
      populate: {
        path: 'user',
        select: 'username fullName profilePicture',
      },
    });

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    res.status(200).json(reply.replies);
  } catch (err) {
    next(err);
  }
};

// Update a sub-reply
export const updateSubReply = async (req, res, next) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    const replyId = req.params.replyId;
    const subReplyId = req.params.subReplyId;

    const subReply = await SubReply.findById(subReplyId);
    if (!subReply) {
      return res.status(404).json({ message: 'Sub-reply not found' });
    }

    if (subReply.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this sub-reply' });
    }

    subReply.text = text;
    subReply.updatedAt = Date.now();

    const updatedSubReply = await subReply.save();
    res.status(200).json(updatedSubReply);
  } catch (err) {
    next(err);
  }
};

// Delete a sub-reply
export const deleteSubReply = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const replyId = req.params.replyId;
    const subReplyId = req.params.subReplyId;

    const subReply = await SubReply.findById(subReplyId);
    if (!subReply) {
      return res.status(404).json({ message: 'Sub-reply not found' });
    }

    if (subReply.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this sub-reply' });
    }

    const reply = await Reply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    reply.replies = reply.replies.filter((reply) => reply.toString() !== subReplyId);
    await reply.save();

    await Like.deleteMany({ likedItem: subReplyId, likedItemType: 'SubReply' });
    await subReply.remove();

    res.status(200).json({ message: 'Sub-reply deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Like a sub-reply
export const likeSubReply = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const subReplyId = req.params.subReplyId;

    const existingLike = await Like.findOne({
      user: userId,
      likedItem: subReplyId,
      likedItemType: 'SubReply',
    });

    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this sub-reply' });
    }

    const newLike = new Like({
      user: userId,
      likedItem: subReplyId,
      likedItemType: 'SubReply',
    });

    await newLike.save();

    const subReply = await SubReply.findByIdAndUpdate(
      subReplyId,
      { $push: { likes: userId } },
      { new: true }
    );

    res.status(200).json(subReply);
  } catch (err) {
    next(err);
  }
};

// Unlike a sub-reply
export const unlikeSubReply = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const subReplyId = req.params.subReplyId;

    const existingLike = await Like.findOne({
      user: userId,
      likedItem: subReplyId,
      likedItemType: 'SubReply',
    });

    if (!existingLike) {
      return res.status(400).json({ message: 'You have not liked this sub-reply' });
    }

    await existingLike.remove();

    const subReply = await SubReply.findByIdAndUpdate(
      subReplyId,
      { $pull: { likes: userId } },
      { new: true }
    );

    res.status(200).json(subReply);
  } catch (err) {
    next(err);
  }
};