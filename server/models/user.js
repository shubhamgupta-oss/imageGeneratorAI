
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        default:"Guest",
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photos:{
        type:Array,
        default:[]
    }
})

const user = mongoose.model("user", userSchema);
module.exports = user;