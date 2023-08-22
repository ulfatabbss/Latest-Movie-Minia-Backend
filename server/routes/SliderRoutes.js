const express = require("express");
const { addSlider, getSpecificSlider, getSlider, updateSlider, deleteSlider } = require("../controllers/SliderController");
const authMiddleware = require("../../authMiddleware");
const router = express.Router();
router.post('/slider', authMiddleware.authenticateToken, addSlider);
router.get('/oneslider', getSpecificSlider)
router.get('/slider', getSlider)
router.put('/slider', authMiddleware.authenticateToken, updateSlider)
router.delete('/slider', authMiddleware.authenticateToken, deleteSlider)
module.exports = router;