import PostImage from '../models/postImageModel.js';
import Post from '../models/postModel.js';
import fs from 'fs';
import path from 'path';

// Upload images for a post
export const uploadPostImages = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const { filename, size, mimetype } = file;
        const dimensions = { width: file.width, height: file.height };

        const newPostImage = new PostImage({
          postId: post._id,
          imageUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
          dimensions,
          size,
          mimetype,
        });

        const savedPostImage = await newPostImage.save();
        return savedPostImage._id;
      })
    );

    post.images = [...post.images, ...uploadedImages];
    await post.save();

    res.status(201).json(uploadedImages);
  } catch (err) {
    next(err);
  }
};

// Get images for a post
export const getPostImages = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate('images');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post.images);
  } catch (err) {
    next(err);
  }
};

// Delete an image from a post
export const deletePostImage = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const imageId = req.params.imageId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const imageToDelete = await PostImage.findById(imageId);

    if (!imageToDelete) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (!post.images.includes(imageToDelete._id)) {
      return res.status(400).json({ message: 'Image does not belong to this post' });
    }

    // Delete the image file from the uploads directory
    const imagePath = path.join(__dirname, '..', 'uploads', imageToDelete.imageUrl.split('/').pop());
    fs.unlinkSync(imagePath);

    // Remove the image from the post's images array
    post.images = post.images.filter((image) => image.toString() !== imageId);
    await post.save();

    // Delete the PostImage document from the database
    await PostImage.findByIdAndDelete(imageId);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    next(err);
  }
};