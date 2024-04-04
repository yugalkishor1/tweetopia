import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import userImageRoutes from './routes/userImageRoutes.js';
import postRoutes from './routes/postRoutes.js';
import postImageRoutes from './routes/postImageRoutes.js';
import postVideoRoutes from './routes/postVideoRoutes.js';
import replyRoutes from './routes/replyRoutes.js';
import subReplyRoutes from './routes/subReplyRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import followRoutes from './routes/followRoutes.js';
import errorMiddleware from './middlewares/error.js';

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/:userId/images', userImageRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts/:postId/images', postImageRoutes);
app.use('/api/posts/:postId/videos', postVideoRoutes);
app.use('/api/posts/:postId/replies', replyRoutes);
app.use('/api/replies/:replyId/subreplies', subReplyRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});