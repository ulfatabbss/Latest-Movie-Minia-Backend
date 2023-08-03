// controllers/playlistController.js
const Playlist = require('../models/Playlist');
const Movie = require('../models/Movies');
const { default: mongoose } = require('mongoose');

// Create a playlist for the logged-in user
const createPlaylist = async (req, res) => {
    try {
        const { movieIds, userId } = req.body;
        if (!Array.isArray(movieIds) || movieIds.length === 0) {
            return res.status(400).json({ error: 'Invalid movieIds provided' });
        }

        // Validate if all the movieIds are valid ObjectIds
        const areAllMovieIdsValid = movieIds.every(movieId => mongoose.Types.ObjectId.isValid(movieId));
        if (!areAllMovieIdsValid) {
            return res.status(400).json({ error: 'Invalid movieIds provided' });
        }
        let playlist = await Playlist.findOne({ user: userId });

        if (!playlist) {
            // If no playlist exists for the user, create a new one
            playlist = new Playlist({ movies: movieIds, user: userId });
        } else {
            // If a playlist exists, add the movieIds to the existing playlist
            playlist.movies.push(...movieIds);
        }

        // Save the playlist
        const newPlaylist = await playlist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all playlists for the logged-in user
const getAllPlaylists = async (req, res) => {
    try {
        const { userId } = req.body; // Assuming the user is stored in req.user after authentication
        const playlists = await Playlist.find({ user: userId }).populate('movies');
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a playlist by ID for the logged-in user
const getPlaylist = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user is stored in req.user after authentication
        const playlist = await Playlist.findOne({ _id: req.params.id, user: userId }).populate('movies');
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a playlist by ID for the logged-in user
const updatePlaylist = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user is stored in req.user after authentication

        // Check if the playlist exists and belongs to the logged-in user
        const playlist = await Playlist.findOneAndUpdate(
            { _id: req.params.id, user: userId },
            { $set: req.body },
            { new: true }
        ).populate('movies');

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a playlist by ID for the logged-in user
const deletePlaylist = async (req, res) => {
    try {
        const { userId } = req.user._id; // Assuming the user is stored in req.user after authentication

        // Check if the playlist exists and belongs to the logged-in user
        const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, user: userId });

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteMovieFromPlaylist = async (req, res) => {
    try {
        const { userId } = req.body; // Assuming the user is stored in req.user after authentication
        const playlistId = req.params.id;
        const movieIdToDelete = req.params.movieId;

        // Check if the playlist exists and belongs to the logged-in user
        const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Check if the movie exists in the playlist
        const movieExistsInPlaylist = playlist.movies.includes(movieIdToDelete);
        if (!movieExistsInPlaylist) {
            return res.status(400).json({ error: 'Movie not found in the playlist' });
        }

        // Remove the movie from the playlist
        await playlist.movies.remove(movieIdToDelete);
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPlaylist,
    getAllPlaylists,
    getPlaylist,
    updatePlaylist,
    deletePlaylist,
    deleteMovieFromPlaylist
};
