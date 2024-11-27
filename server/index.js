import dotenv from 'dotenv';
import express from 'express';
import connectMongodb from './Connection/Mongo.js';
import loginregister from './Routes/loginregister.js';
import imagesRelated from './Routes/imagesRoute.js';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();

app.use(bodyParser.json());  

const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api", loginregister);
app.use("/api", imagesRelated);


connectMongodb(process.env.MONGO_URL)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Global error handling middleware (for unhandled routes or errors)
app.use((err, req, res, next) => {
  console.error(err.stack);  
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
