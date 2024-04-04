import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

 async function connectMongodb(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb atlas is connected");
    } catch (error) {
        console.log("something went wrong with the connection", error);
    }
 }
 export default connectMongodb