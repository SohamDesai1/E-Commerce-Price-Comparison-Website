import mongoose from 'mongoose'

const Product = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    a_price: {
        type: Number,
        required: true,
    },
    f_price: {
        type: Number,
        required: true,
    },
    a_price_change: {
        type: Array,
    },
    f_price_change: {
        type: Array,
    },
    image: {
        type: String,
    },
    a_link:{
        type: String,
    },
    f_link:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.models.Product || mongoose.model("Product", Product);