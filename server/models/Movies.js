const mongoose = require('mongoose');
// Create a movie schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    cast: [
        {
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    poster: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: true
    },
    overView: {
        type: String,
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
