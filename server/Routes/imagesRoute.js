import express from 'express';
import { getAllImages,postImage,generateImage } from '../Controller/imageCreator.js';

const router = express.Router();

router.get('/allImages', getAllImages);
router.post('/postimage', postImage);
router.post('/generateImage', generateImage);






export default router;
