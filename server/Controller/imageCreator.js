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
      const { page = 1, limit = 10 } = req.query; // Extract page and limit from query params
      const skip = (page - 1) * limit; // Calculate the number of records to skip
  
      const total = await Image.countDocuments(); // Total number of documents in the collection
      const images = await Image.find({})
        .sort({ createdAt: -1 }) // Sort by creation date (most recent first)
        .skip(Number(skip)) // Skip records for pagination
        .limit(Number(limit)); // Limit to specified number of records
  
      const totalPages = Math.ceil(total / limit); // Calculate total pages
  
      // Return the data and pagination info
      return res.status(200).json({
        success: true,
        data: images,
        currentPage: Number(page),
        totalPages,
        totalRecords: total,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
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
        const { description, selectedCelebrity } = req.body;

        let specialPrompt = null;
        if (selectedCelebrity) {
          specialPrompt = `Bollywood actor ${selectedCelebrity} inspired images: ${description}`;
        } else {
          specialPrompt = description;
        }        
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

export const getfindimages = async (req, res) => {
    const { queries } = req.query; 
    if (!queries) return res.status(400).json({ error: "No query text provided" });

    try {
        const data = await Image.find({
            title: new RegExp(queries, "i")
        });
        if (data.length === 0) {
            return res.status(404).json({ msg: "No images found matching the query text" });
        }
        res.status(200).json({ msg: "Success", data });
    } catch (error) {
        console.error("Error finding images:", error);
        res.status(500).json({ error: "Error finding images" });
    }
}
export const getimagesID = async (req, res) => {
    const { id } = req.query; 
    if (!id) {
        return res.status(400).json({ error: "No image ID provided" });
    }

    try {
        const data = await Image.findOne({
            _id: id
        });

        if (!data) {
            return res.status(404).json({ msg: "No image found with the given ID" });
        }

        res.status(200).json({ msg: "Success", data });
    } catch (error) {
        console.error("Error finding image:", error);
        res.status(500).json({ error: "Error retrieving image from the database" });
    }
};

