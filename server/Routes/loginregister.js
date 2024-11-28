import { handelRegister, handelLogin,getUserByID } from '../Controller/userRelated.js';
import express from 'express';

const router = express.Router();

router.post('/register', handelRegister)
router.post('/login', handelLogin )
router.get('/getUser', getUserByID);


export default router; 