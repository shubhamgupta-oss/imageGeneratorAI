const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

async function getUser(user){
    return jwt.sign({
        id: user._id,
        name: user.name,
        email:user.email,
    }, process.env.SECRET_KEY, { expiresIn: '10h' })

}

async function setUser(token) {
    if(!token) return null;
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = {
    setUser,
    getUser
}