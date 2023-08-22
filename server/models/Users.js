const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const UsersSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "Admin"], // Possible roles
            default: "user", // Default role
        },
    });
UsersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UsersSchema);
