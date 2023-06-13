const express = require("express");
const { addMovie, getAllMovie, getMovie, updateMovie, deleteMovie } = require("../controllers/MoviesController");
const router = express.Router();

//UserRegistration

router.post('/movies', addMovie);
router.get('/movies', getAllMovie)
router.get('/movies/:id', getMovie)
router.put('/movies/:id', updateMovie)
router.delete('/deletemovie/:id', deleteMovie)
module.exports = router;