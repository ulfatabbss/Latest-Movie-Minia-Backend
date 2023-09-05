const express = require("express");

const { login, profile, forgotPassword, sendOTP, updatePassword, Register, editProfile } = require("../controllers/UserController");
const router = express.Router();
const upload = require("../middlewear/multer");
router.post('/login', login);
router.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send({ message: 'Logout succesufully', success: "true" });
    });
});
router.post('/register', upload.single('profilePicture'), Register);
router.post('/forgotpassword', forgotPassword);
router.get('/getProfile/:id', profile)
router.post('/sendOtp', sendOTP)
router.post('/updatePassword', updatePassword)
router.post('/editProfile/:userId', upload.single('profilePicture'), editProfile)



module.exports = router;