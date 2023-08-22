const express = require("express");
const { addSlider, getSpecificSlider, getSlider, updateSlider, deleteSlider } = require("../controllers/SliderController");
const passport = require('../../Middlewear');
const router = express.Router();
//UserRegistration
router.post('/slider', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), addSlider);
router.get('/oneslider', getSpecificSlider)
router.get('/slider', getSlider)
router.put('/slider', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), updateSlider)
router.delete('/slider', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), deleteSlider)
module.exports = router;