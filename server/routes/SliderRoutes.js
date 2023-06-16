const express = require("express");
const { addSlider, getSpecificSlider, getSlider, updateSlider, deleteSlider } = require("../controllers/SliderController");
const router = express.Router();
//UserRegistration
router.post('/slider', addSlider);
router.get('/oneslider', getSpecificSlider)
router.get('/slider', getSlider)
router.put('/slider', updateSlider)
router.delete('/slider', deleteSlider)
module.exports = router;