import express from 'express';
import connectMongodb from './config/database.js';
import dotenv from "dotenv"
dotenv.config()

const app = express();

connectMongodb()

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
