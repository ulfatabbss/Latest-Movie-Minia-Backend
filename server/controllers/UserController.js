const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const Users = require("../models/Users");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const postUser = async (req, res, next) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).send({ status: false, message: "Email already exists" });
        }
        const user = new Users(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.salt = salt;
        await user.save();

        res.send({ status: true, data: user });
    } catch (err) {
        res.send({ status: false, error: err.message });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await Users.findOne({ email: email })
        if (!user) {
            return res.send({ status: false, message: "User not found...!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({ status: false, message: "Invalid email or password...!" });
        }
        await user.save();
        res.send({ user: user, status: true });
    } catch (err) {
        res.send({ message: err, status: false });

        next(err);
    }
};
const profile = async (req, res) => {
    const search = await req.params.id;
    const user = await Users.findOne({
        _id: search,
    })
    if (!user) {
        return res.send({
            message: "User not Found",
            status: false,
        });
    }
    return res.send({ status: true, data: user });
};
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.send({ status: false, message: "User not found...!" });
        }

        // Create a nodemailer transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: "gmail", // e.g., Gmail, Outlook, etc.
            auth: {
                user: "ulfat106.webevis@gmail.com",
                pass: "cwpgqimeekadrwva",
            },
        });

        // Compose the email with the user's password
        const mailOptions = {
            from: "ulfat106.webevis@gmail.com",
            to: "ulfat106.webevis@gmail.com",
            subject: "Password Reminder",
            text: `Dear ${user.name},\n\nYour password for the account is: ${user.password}\n\nPlease keep this email secure and do not share your password with anyone.\n\nIf you have any concerns, please contact our support team.\n\nBest regards,\nYour App Team`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.send({ status: false, message: "Failed to send the password reminder email." });
            }
            console.log("Email sent: " + info.response);
            res.send({ status: true, message: "Password reminder email sent successfully." });
        });
    } catch (err) {
        res.send({ message: err, status: false });
        next(err);
    }
};
module.exports = {
    login,
    postUser, profile, forgotPassword
};