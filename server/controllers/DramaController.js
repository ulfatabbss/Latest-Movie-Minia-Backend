const express = require('express');
const Drama = require('../models/Drama');
const app = express();
app.use(express.json());
// Create a movie
const addDrama = async (req, res) => {
    try {
        const movie = new Drama(req.body);
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllDrama = async (req, res) => {
    try {
        const movies = await Drama.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Get all movies
// const getAllDrama = async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 10;

//     try {
//         const totalDramas = await Drama.countDocuments();
//         const dramas = await Drama.find({})
//             .skip((page - 1) * pageSize)
//             .limit(pageSize);

//         const totalPages = Math.ceil(totalDramas / pageSize);

//         res.json({
//             dramas,
//             page,
//             pageSize,
//             totalDramas,
//             totalPages,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Get a movie by ID
const getDrama = async (req, res) => {
    try {
        const movie = await Drama.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Drama not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a movie by ID
const updateDrama = async (req, res) => {
    try {
        const movie = await Drama.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ error: 'Drama not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Delete a movie by ID
const deleteDrama = async (req, res) => {
    try {
        const movie = await Drama.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Drama not found' });
        }
        res.json({ message: 'Drama deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    addDrama, getDrama, getAllDrama, deleteDrama, updateDrama
};