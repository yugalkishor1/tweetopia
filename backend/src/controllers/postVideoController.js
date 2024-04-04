import PostVideo from '../models/postVideoModel.js';
import Post from '../models/postModel.js';
import fs from 'fs';
import path from 'path';

// Upload a video for a post
export const uploadPostVideo = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { filename, size } = req.file;
    const duration = req.file.duration; // Assuming you have access to the video duration

    const newPostVideo = new PostVideo({
      postId: post._id,
      videoUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
      duration,
      size,
    });

    const savedPostVideo = await newPostVideo.save();
    post.videos.push(savedPostVideo._id);
    await post.save();

    res.status(201).json(savedPostVideo);
  } catch (err) {
    next(err);
  }
};

// Get a video for a post
export const getPostVideo = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate('videos');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const video = post.videos.find((video) => video.postId.toString() === postId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// Delete a video from a post
export const deletePostVideo = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const videoId = req.params.videoId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const videoToDelete = await PostVideo.findById(videoId);

    if (!videoToDelete) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (!post.videos.includes(videoToDelete._id)) {
      return res.status(400).json({ message: 'Video does not belong to this post' });
    }

    // Delete the video file from the uploads directory
    const videoPath = path.join(__dirname, '..', 'uploads', videoToDelete.videoUrl.split('/').pop());
    fs.unlinkSync(videoPath);

    // Remove the video from the post's videos array
    post.videos = post.videos.filter((video) => video.toString() !== videoId);
    await post.save();

    // Delete the PostVideo document from the database
    await PostVideo.findByIdAndDelete(videoId);

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    next(err);
  }
};