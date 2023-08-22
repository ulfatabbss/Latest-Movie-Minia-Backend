const express = require("express");
const { login, postUser, profile, forgotPassword } = require("../controllers/UserController");
const router = express.Router();
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
router.post('/register', postUser);
router.post('/forgotpassword', forgotPassword);
router.get('/getProfile/:id', profile)
module.exports = router;