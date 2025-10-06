import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToCloudinary = (fileBuffer, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
