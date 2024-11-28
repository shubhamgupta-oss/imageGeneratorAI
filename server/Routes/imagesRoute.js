import express from 'express';
import { getAllImages,postImage,generateImage,getuserimages,getfindimages,getimagesID } from '../Controller/imageCreator.js';
import { authenticateUser } from '../Middlevare/authentication.js';

const router = express.Router();

router.get('/allImages', getAllImages);
router.get('/findimages', getfindimages);
router.get('/imagesID', getimagesID);
router.get('/userimages', authenticateUser, getuserimages);
router.post('/postimage',authenticateUser, postImage);
router.post('/generateImage', generateImage);






export default router;
