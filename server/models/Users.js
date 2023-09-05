const mongoose = require("mongoose");


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
        otp: {
            type: String,
        },
        otpExpiration: {
            type: String,
        },
        profilePicture: {
            type: String, // You can use String to store the image URL or path
            default: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?size=626&ext=jpg&uid=R28842868&ga=GA1.2.332396238.1691144532&semt=ais"
        },
    });

module.exports = mongoose.model("User", UsersSchema);
