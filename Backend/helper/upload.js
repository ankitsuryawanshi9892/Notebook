require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Now you can use cloudinary methods here

const uploadFile=async (filepath)=>{
    try {
        const result = await cloudinary.uploader.upload(filepath);
        return result
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = {
    uploadFile
}