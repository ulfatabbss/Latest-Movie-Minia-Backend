const express = require('express');
const UpComming = require('../models/UpComming');

const app = express();
app.use(express.json());

// Create an upcoming movie
const addUpCommingMovie = async (req, res) => {
    try {
        const movie = new UpComming(req.body);
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllUpCommingMovie = async (req, res) => {
    try {
        const movies = await UpComming.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Get all upcoming movies with paging
// const getAllUpCommingMovie = async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 10;

//     try {
//         const totalMovies = await UpComming.countDocuments();
//         const movies = await UpComming.find({})
//             .skip((page - 1) * pageSize)
//             .limit(pageSize);
//         const totalPages = Math.ceil(totalMovies / pageSize);
//         res.json({
//             movies,
//             page,
//             pageSize,
//             totalMovies,
//             totalPages,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// Get an upcoming movie by ID
const getUpCommingMovie = async (req, res) => {
    try {
        const movie = await UpComming.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an upcoming movie by ID
const updateUpCommingMovie = async (req, res) => {
    try {
        const movie = await UpComming.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete an upcoming movie by ID
const deleteUpCommingMovie = async (req, res) => {
    try {
        const movie = await UpComming.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addUpCommingMovie,
    getUpCommingMovie,
    getAllUpCommingMovie,
    deleteUpCommingMovie,
    updateUpCommingMovie
};
