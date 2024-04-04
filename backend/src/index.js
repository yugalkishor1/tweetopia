import express from 'express';
import morgan from 'morgan'; // HTTP request logger middleware
import cors from 'cors'; // Cross-Origin Resource Sharing middleware
import helmet from 'helmet'; // Security middleware
import compression from 'compression'; // Compression middleware
import connectDB from './config/database.js'; // MongoDB Atlas connection
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import followRoutes from './routes/followRoutes.js';
import errorMiddleware from './middlewares/error.js'; // Error handling middleware

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(morgan('dev')); // Log HTTP requests
app.use(cors()); // Enable CORS
app.use(helmet()); // Secure the app with HTTP headers
app.use(compression()); // Compress response data
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});