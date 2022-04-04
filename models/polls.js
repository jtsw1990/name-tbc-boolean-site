const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose.Schema is a constructor function
// Main model to hold questions
// TBD on whether or not separate models are used for replies

const pollSchema = new Schema({
    question: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Poll = mongoose.model("Poll", pollSchema);
module.exports = Poll;