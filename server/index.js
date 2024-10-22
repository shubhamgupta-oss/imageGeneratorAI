const dotenv = require('dotenv');
const express = require("express");
const {connectMongodb} = require("./Connection/Mongo.js"); 
const loginregister = require('./Routes/loginregister.js');

dotenv.config();
const app = express();
const port = process.env.PORT || 3001; 

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", loginregister)


connectMongodb("mongodb://localhost:27017/imageCreator").then(() => console.log("Mongo Connected"))
.catch(err => console.log(err));;
console.log(port)

app.listen(port, () => console.log("Server Started"))
