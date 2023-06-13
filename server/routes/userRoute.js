const express = require("express");
const { login, postUser, profile } = require("../controllers/UserController");
const router = express.Router();

//UserRegistration

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
router.post('/newUser', postUser);
router.get('/getProfile/:id', profile)

module.exports = router;