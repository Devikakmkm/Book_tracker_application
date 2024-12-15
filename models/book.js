const mongoose = require('mongoose');

// Define the schema for a book
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

// Create and export the model
module.exports = mongoose.model('Book', bookSchema);
