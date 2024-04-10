const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
cloud_name: 'tweetopia',
api_key: 537972811761678,
api_secret:"fPB1xzFZ_mXEYWLKPEreUQEav",
});

const storage = new CloudinaryStorage({
cloudinary: cloudinary,
params: {
folder: 'twitter-clone',
format: async (req, file) => 'jpg', // Specify the desired file format
public_id: (req, file) =>` ${Date.now()}-${file.originalname}`,
},
});

const fileUpload = multer({ storage: storage });

export default fileUpload; 