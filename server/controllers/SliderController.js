const express = require('express');
const Slider = require('../models/Slider');

const app = express();
app.use(express.json());

// Create a movie
const addSlider = async (req, res) => {
    try {
        const movie = new Slider(req.body);
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all movies
const getSlider = async (req, res) => {
    try {
        const movies = await Slider.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a movie by ID
const getSpecificSlider = async (req, res) => {
    try {
        const movie = await Slider.findOne({ name: req.body.name });
        if (!movie) {
            return res.status(404).json({ error: 'Slider not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a movie by ID
const updateSlider = async (req, res) => {
    try {
        const movie = await Slider.findOneAndUpdate({ name: req.body.name }, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ error: 'Slider not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a movie by ID
const deleteSlider = async (req, res) => {
    try {
        const movie = await Slider.findOneAndDelete({ name: req.body.name });
        if (!movie) {
            return res.status(404).json({ error: 'Slider not found' });
        }
        res.json({ message: 'Slider deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    addSlider, getSlider, getSpecificSlider, updateSlider, deleteSlider
};