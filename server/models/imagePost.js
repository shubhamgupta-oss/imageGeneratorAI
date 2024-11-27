import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    Rating: { type: Number, default: 5 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true
    }
}, {
    timestamps: true 
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
