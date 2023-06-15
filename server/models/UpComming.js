const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const UpComming = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        director: {
            type: String,
            required: true
        },
        releaseYear: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        cast: [
            {
                name: {
                    type: String,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                }
            }
        ],
        poster: [
            {
                image: {
                    type: String,
                    required: true
                }
            }
        ],
        category: {
            type: String,
            required: true
        },
        overView: {
            type: String,
        }
    });
UpComming.plugin(passportLocalMongoose);
module.exports = mongoose.model("UpComming", UpComming);
