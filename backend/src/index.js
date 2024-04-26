import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import  bodyParser from "body-parser";
import connectDB from './config/database.js';


// Import routes
import authRoutes from './routes/authRoutes.js';
// import postRoutes from "./routes/postRoutes.js"

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/api/auth', authRoutes)  
// app.use('/api/post', postRoutes)  

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