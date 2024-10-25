import Image from '../models/imagePost.js';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import OpenAIApi  from 'openai';

dotenv.config();

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
});


export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find({});
        if (images.length === 0) {
            return res.status(404).json({ msg: "Data Not Found" });
        }
        return res.status(200).json({ success: true, data: images });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};


export const postImage = async (req, res) => {
    try {
        const { name, description, images } = req.body;

        if (!name || !description || !images) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const imgURL = await cloudinary.uploader.upload(images, { resource_type: 'image' });

        const newImg = await Image.create({
            name,
            description, 
            images: imgURL.secure_url,
        });

        return res.status(201).json({ success: true, data: newImg });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ status: "failed", message: "Description is required" });
        }
        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json',
        });
        res.status(201).json({ status: "Created", data: response.data.data[0].b64_json });
    } catch (error) {
        console.error("Error generating image:", error.message);
        return res.status(500).json({ status: "failed", error: error.message });
    }
};
