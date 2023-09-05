const express = require("express");
const router = express.Router();
// Assuming your FeedbackController is defined in a separate module
const { AddFeedback, GetFeedback } = require('../controllers/FeedbackController');

// Define the feedback route
router.post('/submit-feedback', AddFeedback);
router.get('/get-feedback', GetFeedback);

module.exports = router;