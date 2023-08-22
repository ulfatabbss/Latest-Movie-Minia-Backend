const express = require('express');
const Slider = require('../models/Slider');

const app = express();
app.use(express.json());
// Create a movie
const addSlider = async (req, res) => {
    try {
        const slider = new Slider(req.body);
        const newSlider = await slider.save();
        res.status(201).json(newSlider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// Get all movies
const getSlider = async (req, res) => {
    try {
        const slider = await Slider.find({});
        res.json(slider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Get a movie by ID
const getSpecificSlider = async (req, res) => {
    try {
        const slider = await Slider.findOne({ name: req.body.name });
        if (!slider) {
            return res.status(404).json({ error: 'Slider not found' });
        }
        res.json(slider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Update a movie by ID
const updateSlider = async (req, res) => {
    try {
        const slider = await Slider.findOneAndUpdate({ name: req.body.name }, req.body, { new: true });
        if (!slider) {
            return res.status(404).json({ error: 'Slider not found' });
        }
        res.json(slider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Delete a movie by ID
const deleteSlider = async (req, res) => {
    try {
        const slider = await Slider.findOneAndDelete({ name: req.body.name });
        if (!slider) {
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