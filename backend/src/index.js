import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json())




// routes
app.use('/api/auth', authRoutes)  

app.get("/",(req,res)=>{
  res.json("helloooooooooooooo")
})


connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});