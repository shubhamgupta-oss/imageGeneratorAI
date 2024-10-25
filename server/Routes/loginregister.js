import { handelRegister, handelLogin } from '../Controller/userRelated.js';
import express from 'express';

const router = express.Router();

router.post('/register', handelRegister)
router.post('/login', handelLogin )


export default router; 