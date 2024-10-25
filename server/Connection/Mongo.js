import mongoose from 'mongoose';

export default async function connectMongodb(url) {
    return mongoose.connect(url);
}
