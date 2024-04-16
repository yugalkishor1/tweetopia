import postModel from '../models/postModel';
import userModel from '../models/userModel';
import postImagesModel from '../models/postImagesModel';
import postVideosModel from '../models/postVideosModel';

export const createPost = async (req, res) => {
  try {
    const { text, images, videos, hashtags, mentions } = req.body;
    const { userId } = req.user; // Assuming the user ID is available in the request object

    // Create the post
    const post = new postModel({
      text,
      user: userId,
      hashtags,
      mentions,
    });
    await post.save();

    // Handle images
    if (images && images.length > 0) {
      const postImages = [];
      for (const image of images) {
        const { imageUrl, width, height, size } = image;
        const postImage = new postImagesModel({
          postId: post._id,
          imageUrl,
          dimensions: { width, height },
          size,
        });
        await postImage.save();
        postImages.push(postImage._id);
      }
      post.images = postImages;
      await post.save();
    }

    // Handle videos
    if (videos && videos.length > 0) {
      const postVideos = [];
      for (const video of videos) {
        const { videoUrl, duration, size } = video;
        const postVideo = new postVideosModel({
          postId: post._id,
          videoUrl,
          duration,
          size,
        });
        await postVideo.save();
        postVideos.push(postVideo._id);
      }
      post.videos = postVideos;
      await post.save();
    }

    // Update the user's post count
    await userModel.findByIdAndUpdate(userId, { $inc: { postCount: 1 } });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};