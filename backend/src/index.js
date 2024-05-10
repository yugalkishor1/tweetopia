import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import  bodyParser from "body-parser";
import connectDB from './config/database.js';
import multer from "multer"


import authRoutes from './routes/authRoutes.js';
import postRoutes from "./routes/postRoutes.js"
// import likeRoutes from "./routes/likeRoutes.js"
// import followRoutes from "./routes/followRoutes.js"
// import followRoutes from "./routes/followRoutes.js"
// import followRoutes from "./routes/followRoutes.js"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// bhilai smriti nagar software development
// routes
app.use('/api/auth', authRoutes)  
app.use('/api/post', postRoutes)  

app.use((err, req, res, next) => {
  console.error(err); 
  res.status(500).json({ error: 'An error occurred' }); // Send a JSON response with an error message
});


connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});