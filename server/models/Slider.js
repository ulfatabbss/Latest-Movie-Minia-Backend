const mongoose = require('mongoose');
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
const Slider = mongoose.model('Slider', SliderSchema);
module.exports = Slider;
