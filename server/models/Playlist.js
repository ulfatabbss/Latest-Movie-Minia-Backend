// models/Playlist.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    movies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Movie'
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
