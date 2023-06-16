const mongoose = require('mongoose');
// Create a movie schema
const SliderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poster: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],

});
// Create movie model
const Slider = mongoose.model('Slider', SliderSchema);
module.exports = Slider;
