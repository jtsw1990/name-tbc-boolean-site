const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose.Schema is a constructor function
// Model to hold meta data for questions


const scoreSchema = new Schema({
    question_id: {
        type: String,
        required: true
    },
    y_result: {
        type: String,
        required: false
    },
    n_result: {
        type: String,
        required: false
    }
}, { timestamps: true })

const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;