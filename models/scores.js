const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose.Schema is a constructor function
// Model to hold meta data for questions


const scoreSchema = new Schema({
    question_id: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: "Local"
    },
    y_count: {
        type: Number,
        required: true,
        default: 0
    },
    n_count: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;