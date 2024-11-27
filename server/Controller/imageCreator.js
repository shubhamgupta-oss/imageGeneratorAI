import Image from '../models/imagePost.js';
import user from '../models/user.js'
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import axios from "axios";


dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
});


export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find({}).sort({ createdAt: -1 }); // Sorting in descending order of creation
        if (images.length === 0) {
            return res.status(404).json({ msg: "Data Not Found" });
        }
        return res.status(200).json({ success: true, data: images });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};
        export const getuserimages = async (req, res) => {
            try {
                const { id } = await req.user; 
                const getUser = await user.findOne({ _id: id });
                if (!getUser) {
                    return res.status(400).json({ msg: "The User is not present in DB" });
                }

                const userImages = await Image.find({ user: id }).sort({ createdAt: -1 });
                console.log(userImages);
                if (userImages.length === 0) {
                    return res.status(404).json({ msg: "No images found for this user" });
                }

                return res.status(200).json({ success: true, data: userImages });

            } catch (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: 'Server Error' });
            }
        };


export const postImage = async (req, res) => {
    try {
        const { title, description, image, Rating } = req.body;
        const {id} = await req.user;
        const getUser = await user.find({_id : id});
        if(!getUser) return res.status(400).json({msg:"The User is not present in DB"});
        if (!title || !description || !image) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const imgURL = await cloudinary.uploader.upload(image, { resource_type: 'image' });
        if (!imgURL) {
            return res.status(400).json({msg:"The genrated image is not compatable for save"});
        }
          
        const responce = await Image.create({
            title,
            description, 
            images: imgURL.secure_url, 
            Rating,
            user:id
        });
       

        return res.status(201).json({ success: true, data: responce.secure_url });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const generateImage = async (req, res) => {
    try {
        const { description } = req.body;
        const specialPrompt = `Bollywood actor Amitabh Bachchan inspired images: ${description}`;
        if (!description) {
            return res.status(400).json({ status: "failed", message: "Description is required" });
        }

       
        const response = await axios.post(
            process.env.API_URL,
            { inputs: specialPrompt },
            {
                headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
                responseType: "arraybuffer", 
            }
        );
        const base64Image = Buffer.from(response.data, "binary").toString("base64");
        res.status(201).json({ status: "success", image: base64Image, specialPrompt });
        // res.status(201).json({ status: "Created", data: response.data.data[0].b64_json });
    } catch (error) {

        console.error("Error generating image:",  error);
        res.status(500).json({ error: "Error generating image" });
    }
};
