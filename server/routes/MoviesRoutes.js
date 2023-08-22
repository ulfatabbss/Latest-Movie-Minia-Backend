const express = require("express");
const { addMovie, getAllMovie, getMovie, updateMovie, deleteMovie } = require("../controllers/MoviesController");
const { addUpCommingMovie, getAllUpCommingMovie, getUpCommingMovie, deleteUpCommingMovie } = require("../controllers/Upcomming");
const { createPlaylist, getAllPlaylists, getPlaylist, deletePlaylist, deleteMovieFromPlaylist } = require("../controllers/playlistController");
const authMiddleware = require("../../authMiddleware");
const router = express.Router();
router.post('/movies', authMiddleware.authenticateToken, addMovie);
router.get('/movies', getAllMovie)
router.get('/movies/:id', getMovie)
router.put('/movies/:id', authMiddleware.authenticateToken, updateMovie)
router.delete('/deletemovie/:id', authMiddleware.authenticateToken, deleteMovie)
router.post('/UpComming_movies', authMiddleware.authenticateToken, addUpCommingMovie);
router.get('/UpComming_movies', getAllUpCommingMovie);
router.get('/UpComming_movies/:id', getUpCommingMovie);
router.delete('/dell_UpComming_movies/:id', authMiddleware.authenticateToken, deleteUpCommingMovie);
router.post('/playlists', authMiddleware.authenticateToken, createPlaylist);
router.post('/getplaylists', authMiddleware.authenticateToken, getAllPlaylists);
router.get('/playlists/:id', getPlaylist);
router.delete('/playlists/:id', authMiddleware.authenticateToken, deletePlaylist);
router.delete('/playlists/:id/movies/:movieId', authMiddleware.authenticateToken, deleteMovieFromPlaylist);


module.exports = router;