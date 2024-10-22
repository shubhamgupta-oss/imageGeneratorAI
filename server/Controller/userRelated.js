const User = require('../models/user.js'); 
const {getUser} = require('../HelperFunction/Jwtokens.js')
const bcrypt = require('bcrypt');

async function handelRegister(req, res) {
    try {
        const { Fname, email, password } = req.body;
        if (!Fname || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields: name, email, and password."
            });
        }
        
        const foundUser = await User.findOne({ email }); 
        if (foundUser) { 
            return res.status(400).json({
                message: "The email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({ Fname, email, password:hashedPassword });
        const token = await getUser(createdUser);
        return res.status(201).json({ 
            message: "User registered successfully", 
            token 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Something went wrong", 
            error: error.message 
        });
    }
}

async function handelLogin(req, res) {
   try{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send("please fill all the fields")
    }
    const dbUser = await User.findOne({email});
    if(!dbUser) return res.status(404).send("user not found");

    const passwordCheck = await bcrypt.compare(password, dbUser.password)
    if(!passwordCheck){
        return res.status(400).json({ message: "Invalid credentials." });
    }   
    const token = await getUser(dbUser);
    return res.status(200).json({ 
        message: "User LogedIn successfully", 
        token 
    }); 
   }catch (error){
    return res.status(500).json({ 
        message: "Something went wrong", 
        error: error.message 
    });
   }


}




module.exports = {
    handelLogin,
    handelRegister
};
