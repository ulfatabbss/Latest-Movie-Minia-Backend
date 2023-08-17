const express = require('express');
const Movie = require('../models/Movies');

const app = express();
app.use(express.json());

// Create a movie
const addMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all movies
const getAllMovie = async (req, res) => {
    try {
        // Fetch all movies and sort them by _id in descending order (newest first)
        const movies = await Movie.find({}).sort({ _id: -1 });

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Get a movie by ID
const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a movie by ID
const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a movie by ID
const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    addMovie,
    getAllMovie, getMovie, deleteMovie, updateMovie
};