const express = require('express')
const {handelRegister, handelLogin} = require("../Controller/userRelated.js")

const router = express.Router();

router.post('/register', handelRegister)
router.post('/login', handelLogin )


module.exports = router; 