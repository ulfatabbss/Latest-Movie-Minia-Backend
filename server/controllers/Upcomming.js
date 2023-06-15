const express = require('express');
const UpComming = require('../models/UpComming');

const app = express();
app.use(express.json());

// Create a movie
const addUpCommingMovie = async (req, res) => {
    try {
        const movie = new UpComming(req.body);
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all movies
const getAllUpCommingMovie = async (req, res) => {
    try {
        const movies = await UpComming.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a movie by ID
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

// Update a movie by ID
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




// Delete a movie by ID
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
    addUpCommingMovie, getUpCommingMovie, getAllUpCommingMovie, deleteUpCommingMovie, updateUpCommingMovie
};