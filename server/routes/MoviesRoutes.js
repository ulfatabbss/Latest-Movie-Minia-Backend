const express = require("express");
const { addMovie, getAllMovie, getMovie, updateMovie, deleteMovie } = require("../controllers/MoviesController");
const { addUpCommingMovie, getAllUpCommingMovie, getUpCommingMovie, deleteUpCommingMovie } = require("../controllers/Upcomming");
const { createPlaylist, getAllPlaylists, getPlaylist, deletePlaylist, deleteMovieFromPlaylist } = require("../controllers/playlistController");
const router = express.Router();
const passport = require("../../Middlewear");
//UserRegistration
router.post('/movies', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), addMovie);
router.get('/movies', getAllMovie)
router.get('/movies/:id', getMovie)
router.put('/movies/:id', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), updateMovie)
router.delete('/deletemovie/:id', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), deleteMovie)
router.post('/UpComming_movies', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), addUpCommingMovie);
router.get('/UpComming_movies', getAllUpCommingMovie);
router.get('/UpComming_movies/:id', getUpCommingMovie);
router.delete('/dell_UpComming_movies/:id', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), deleteUpCommingMovie);
router.post('/playlists', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), createPlaylist);
router.post('/getplaylists', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), getAllPlaylists);
router.get('/playlists/:id', getPlaylist);
router.delete('/playlists/:id', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), deletePlaylist);
router.delete('/playlists/:id/movies/:movieId', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), deleteMovieFromPlaylist);


module.exports = router;