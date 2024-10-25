import dotenv from 'dotenv';
import express from 'express'
import  connectMongodb  from './Connection/Mongo.js';
import loginregister from './Routes/loginregister.js';
import imagesRelated from './Routes/imagesRoute.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 3001; 

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", loginregister)
app.use("/api", imagesRelated)




connectMongodb(process.env.MONGO_URL).then(() => console.log("Mongo Connected"))
.catch(err => console.log(err));;
console.log(port)

app.listen(port, () => console.log("Server Started"))
 