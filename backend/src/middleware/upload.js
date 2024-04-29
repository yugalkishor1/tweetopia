import multer from "multer"
import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

cloudinary.config({
cloud_name: 'tweetopia',
api_key: 537972811761678,
api_secret:"fPB1xzFZ_mXEYWLKPEreUQEav-Y",
});

const storage = new CloudinaryStorage({cloudinary: cloudinary});

const fileUpload = multer({ storage: storage });

export default fileUpload; 