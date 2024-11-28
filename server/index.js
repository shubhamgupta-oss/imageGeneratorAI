import dotenv from 'dotenv';
import express from 'express';
import connectMongodb from './Connection/Mongo.js';
import loginregister from './Routes/loginregister.js';
import imagesRelated from './Routes/imagesRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();

const port = process.env.PORT || 3001;

app.use(cors({
    origin: "https://imagegeneratorai-1.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());
app.use(express.json());

app.use("/api", loginregister);
app.use("/api", imagesRelated);

connectMongodb(process.env.MONGO_URL)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
