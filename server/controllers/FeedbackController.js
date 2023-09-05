const express = require('express');
const app = express();
app.use(express.json());
const Feedback = require('../models/FeedbackModel'); // Import your Feedback model

// POST route for submitting user feedback
const AddFeedback = async (req, res, next) => {
    try {
        const { user_id, feedback_text } = req.body;

        // Create a new feedback document
        const feedback = new Feedback({
            user_id, // Add user ID if you're tracking users
            feedback_text,
            timestamp: Date.now(),
        });

        // Save the feedback to the database
        await feedback.save();

        res.status(201).json({ status: true, message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ status: false, message: 'Error submitting feedback' });
    }
};

const GetFeedback = async (req, res, next) => {
    try {
        const feedbackList = await Feedback.find().populate('user_id');
        res.status(200).json({ status: true, data: feedbackList });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ status: false, message: 'Error fetching feedback' });
    }
}

module.exports = { AddFeedback, GetFeedback };
