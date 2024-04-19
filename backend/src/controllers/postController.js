import postModel from '../models/postModel.js';
import userModel from '../models/userModel.js';
import postImagesModel from '../models/postImageModel.js';
import postVideosModel from '../models/postVideoModel.js';

export const createPost = async (req, res) => {
  try {
    // const { userId } = req.user; 
    const { text, images, videos, hashtags, mentions,user } = req.body;

    const newPost = await postModel.create({ user,text,hashtags})

    // Handle images
    if (images && images.length > 0) {
      const postImages = [];
      for (const image of images) {
        const { imageUrl, width, height, size } = image;
        const newPostImage = await postImagesModel.create({ postId:newPost._id,imageUrl,dimensions:{height,width},size })

        postImages.push(newPostImage._id);
      }
      newPost.images = postImages;
      await post.save();
    }

    // Handle videos
    if (videos && videos.length > 0) {
      const postVideos = [];
      for (const video of videos) {
        const { videoUrl, duration, size } = video;
        const newPostVideo = await postVideosModel.create({ postId:newPost._id,videoUrl,duration,size})

        postVideos.push(newPostVideo._id)
      }
      newPost.videos = postVideos;
      await post.save();
    }

    // Update the user's post count
    await userModel.findByIdAndUpdate(user, { $push: { posts: newPost._id } });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};















// // Get all posts
// export const getAllPosts = async (req, res, next) => {
//   try {
//     const posts = await Post.find()
//       .populate('user', 'username fullName profilePicture')
//       .populate('images', 'imageUrl dimensions size')
//       .populate('videos', 'videoUrl duration size')
//       .sort({ createdAt: -1 });

//     res.status(200).json(posts);
//   } catch (err) {
//     next(err);
//   }
// };

// // Get a post by ID
// export const getPostById = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.postId)
//       .populate('user', 'username fullName profilePicture')
//       .populate('images', 'imageUrl dimensions size')
//       .populate('videos', 'videoUrl duration size')
//       .populate('replies', 'text user createdAt');

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.status(200).json(post);
//   } catch (err) {
//     next(err);
//   }
// };

// // Update a post
// export const updatePost = async (req, res, next) => {
//   try {
//     const { text, hashtags, mentions } = req.body;
//     const userId = req.user._id;

//     const post = await Post.findById(req.params.postId);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     if (post.user.toString() !== userId.toString()) {
//       return res.status(403).json({ message: 'Not authorized to update this post' });
//     }

//     post.text = text || post.text;
//     post.hashtags = hashtags || post.hashtags;
//     post.mentions = mentions || post.mentions;
//     post.updatedAt = Date.now();

//     const updatedPost = await post.save();

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     next(err);
//   }
// };

// // Delete a post
// export const deletePost = async (req, res, next) => {
//   try {
//     const userId = req.user._id;

//     const post = await Post.findById(req.params.postId);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     if (post.user.toString() !== userId.toString()) {
//       return res.status(403).json({ message: 'Not authorized to delete this post' });
//     }

//     // Delete post images and videos
//     if (post.images && post.images.length > 0) {
//       await PostImage.deleteMany({ _id: { $in: post.images } });
//     }

//     if (post.videos && post.videos.length > 0) {
//       await PostVideo.deleteMany({ _id: { $in: post.videos } });
//     }

//     // Delete post replies and likes
//     await Reply.deleteMany({ post: post._id });
//     await Like.deleteMany({ likedItem: post._id, likedItemType: 'Post' });

//     await post.remove();

//     res.status(200).json({ message: 'Post deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// };

// // Like a post
// export const likePost = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const postId = req.params.postId;

//     // Check if the user has already liked the post
//     const existingLike = await Like.findOne({ user: userId, likedItem: postId, likedItemType: 'Post' });
//     if (existingLike) {
//       return res.status(400).json({ message: 'You have already liked this post' });
//     }

//     // Create a new like
//     const newLike = new Like({
//       user: userId,
//       likedItem: postId,
//       likedItemType: 'Post',
//     });

//     await newLike.save();

//     // Update the post's likes array
//     await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });

//     res.status(200).json({ message: 'Post liked successfully' });
//   } catch (err) {
//     next(err);
//   }
// };

// // Unlike a post
// export const unlikePost = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const postId = req.params.postId;

//     // Check if the user has already liked the post
//     const existingLike = await Like.findOne({ user: userId, likedItem: postId, likedItemType: 'Post' });
//     if (!existingLike) {
//       return res.status(400).json({ message: 'You have not liked this post' });
//     }

//     // Delete the like
//     await existingLike.remove();

//     // Update the post's likes array
//     await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });

//     res.status(200).json({ message: 'Post unliked successfully' });
//   } catch (err) {
//     next(err);
//   }
// };

// // Retweet a post
// export const retweetPost = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const postId = req.params.postId;

//     // Check if the user has already retweeted the post
//     const existingRetweet = await Post.findOne({ 'retweetData.user': userId, 'retweetData.post': postId });
//     if (existingRetweet) {
//       return res.status(400).json({ message: 'You have already retweeted this post' });
//     }

//     // Get the original post
//     const originalPost = await Post.findById(postId);

//     if (!originalPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     // Create a new post with the retweet data
//     const newPost = new Post({
//       user: userId,
//       retweetData: {
//         user: originalPost.user,
//         post: originalPost._id,
//       },
//     });

//     const savedPost = await newPost.save();

//     // Add the new post to the user's posts array
//     await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });

//     res.status(201).json(savedPost);
//   } catch (err) {
//     next(err);
//   }
// };

// // Add a comment to a post
// export const addComment = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const postId = req.params.postId;
//     const { text } = req.body;

//     // Get the post
//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     // Create a new reply
//     const newReply = new Reply({
//       text,
//       user: userId,
//       post: postId,
//     });

//     const savedReply = await newReply.save();

//     // Add the new reply to the post's replies array
//     post.replies.push(savedReply._id);
//     await post.save();

//     res.status(201).json(savedReply);
//   } catch (err) {
//     next(err);
//   }
// };

// // Get comments for a post
// export const getPostComments = async (req, res, next) => {
//   try {
//     const postId = req.params.postId;

//     // Get the post and populate the replies
//     const post = await Post.findById(postId)
//       .populate({
//         path: 'replies',
//         populate: {
//           path: 'user',
//           select: 'username fullName profilePicture',
//         },
//       });

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.status(200).json(post.replies);
//   } catch (err) {
//     next(err);
//   }
// };