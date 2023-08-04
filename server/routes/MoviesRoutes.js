const express = require("express");
const { addMovie, getAllMovie, getMovie, updateMovie, deleteMovie } = require("../controllers/MoviesController");
const { addUpCommingMovie, getAllUpCommingMovie, getUpCommingMovie, deleteUpCommingMovie } = require("../controllers/Upcomming");
const { createPlaylist, getAllPlaylists, getPlaylist, deletePlaylist, deleteMovieFromPlaylist } = require("../controllers/playlistController");
const router = express.Router();
//UserRegistration
router.post('/movies', addMovie);
router.get('/movies', getAllMovie)
router.get('/movies/:id', getMovie)
router.put('/movies/:id', updateMovie)
router.delete('/deletemovie/:id', deleteMovie)
router.post('/UpComming_movies', addUpCommingMovie);
router.get('/UpComming_movies', getAllUpCommingMovie);
router.get('/UpComming_movies/:id', getUpCommingMovie);
router.delete('/dell_UpComming_movies/:id', deleteUpCommingMovie);
router.post('/playlists', createPlaylist);
router.post('/getplaylists', getAllPlaylists);
router.get('/playlists/:id', getPlaylist);
router.delete('/playlists/:id', deletePlaylist);
router.delete('/dellplaylistmovie/:id', deleteMovieFromPlaylist);


module.exports = router;