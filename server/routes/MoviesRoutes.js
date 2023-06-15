const express = require("express");
const { addMovie, getAllMovie, getMovie, updateMovie, deleteMovie } = require("../controllers/MoviesController");
const { addUpCommingMovie, getAllUpCommingMovie, getUpCommingMovie, deleteUpCommingMovie } = require("../controllers/Upcomming");
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




module.exports = router;