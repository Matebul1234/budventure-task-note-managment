const mongoose = require('mongoose');

// Define the schema with timestamps
const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

// Create the model
const noteModel = mongoose.model('notes', noteSchema);
module.exports = noteModel;
