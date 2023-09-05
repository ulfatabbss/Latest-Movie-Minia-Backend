const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const cloudinary = require("../utils/cloudinary");
const Register = async (req, res, next) => {

    try {
        // console.log("req.file.path:", req.file.path);
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.send({ status: false, message: "Email already exists" });
        }
        await cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error"
                })
            }
            req.body.profilePicture = result.secure_url;
        })

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
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.send({ status: false, message: "User not found...!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({ status: false, message: "Invalid email or password...!" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role }, // Include role in the payload
            config.JWT_SECRET,
            { expiresIn: "1h" }
        );
        // Include the token in the response
        res.send({ user: user, status: true, token: token });
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
            service: "Gmail", // e.g., Gmail, Outlook, etc.
            auth: {
                user: "ulfat106.webevis@gmail.com",
                pass: "cwpgqimeekadrwva",
            },
        });
        const salt = await bcrypt.genSalt();
        const psssword = await bcrypt.hash(user.password, salt)
        // Compose the email with the user's password
        const mailOptions = {
            from: "ulfat106.webevis@gmail.com",
            to: "ulfatsial106@gmail.com",
            subject: "Password Reminder",
            text: `Dear ${user.name},\n\nYour password for the account is: ${psssword}\n\nPlease keep this email secure and do not share your password with anyone.\n\nIf you have any concerns, please contact our support team.\n\nBest regards,\n Webevies Mobile team`,
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
const generateOTP = () => {
    // Generate a 4-digit OTP
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const updatePassword = async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.send({ status: false, message: "User not found...!" });
        }

        // Debug: Log user's stored OTP and expiration time
        console.log("Stored OTP:", user.otp);
        console.log("OTP Expiration:", user.otpExpiration);

        // Check if the OTP matches the one stored in the user's document
        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            console.log("Invalid OTP or OTP has expired");
            return res.send({ status: false, message: "Invalid OTP or OTP has expired...!" });
        }

        // Update the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.otp = null; // Clear the OTP after successful password update
        await user.save();

        // Generate a new JWT token with the updated user information if needed

        res.send({ status: true, message: "Password updated successfully." });
    } catch (err) {
        console.error("Error in updatePassword:", err);
        res.send({ message: err.message, status: false });
        next(err);
    }
};


const sendOTP = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.send({ status: false, message: "User not found...!" });
        }

        // Generate OTP and set its expiration time (e.g., 15 minutes from now)
        const otp = generateOTP();
        const otpExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Update user document with the OTP and expiration time
        user.otp = otp;
        user.otpExpiration = otpExpiration;
        await user.save();
        console.log(user, "new oneeeeee");
        // Send the OTP to the user's email
        const transporter = nodemailer.createTransport({
            service: "Gmail", // e.g., Gmail, Outlook, etc.
            auth: {
                user: "ulfat106.webevis@gmail.com",
                pass: "cwpgqimeekadrwva",
            },
        });
        const mailOptions = {
            from: "ulfat106.webevis@gmail.com",
            to: email,
            subject: "OTP",
            text: `Dear ${user.name},\n\nYour password for the account is:${otp}`,
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.send({ status: false, message: "Failed to send OTP email." });
            }
            console.log("OTP email sent: " + info.response);
            res.send({ status: true, message: "OTP sent successfully." });
        });
    } catch (err) {
        res.send({ message: err.message, status: false });
        next(err);
    }
};
const editProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await Users.findById(userId, { new: true });

        if (!user) {
            return res.send({ status: false, message: "User not found...!" });
        }

        // Check if a new profile picture was uploaded
        await cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error"
                })
            }
            user.profilePicture = result.secure_url;
        })

        // Update other user information here as needed
        user.name = req.body.name;
        user.email = req.body.email;
        // Save the updated user
        await user.save();

        res.send({ status: true, data: user });
    } catch (err) {
        res.send({ status: false, error: err.message });
    }
};

module.exports = {
    login,
    Register,
    profile,
    forgotPassword,
    sendOTP,
    updatePassword, editProfile
};