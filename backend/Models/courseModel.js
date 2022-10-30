const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseTitle: {
        type: String,
        required: true
    },
    subtitles: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shortSummary: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    courseRating: {
        type: Number,
        required: true
    },
    courseExercises: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)