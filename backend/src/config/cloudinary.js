import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
  cloud_name: 'tweetopia', 
  api_key: '537972811761678', 
  api_secret: 'fPB1xzFZ_mXEYWLKPEreUQEav-Y' 
});

export const uplaodFileToCoudinary = async (filePath) => {
  try {
    if(!filePath) return null;
    const resposne = await cloudinary.uploader.upload(filePath);
    console.log(resposne.url);
    return resposne.url;
  } catch (error) {
    fs.unlinkSync(filePath)
  }
}