var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./server/models/Users');
const jwtStrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const config = require('./server/config/config');


exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(
    function (username, pass, done) {
        User.findOne({ username: username })
            .then((user) => {
                console.log(user)
                done(null, user)
            })
            .catch(err => {
                done(err, null)
            })
    }
));

passport.serializeUser(function (user, done) {
    // console.log('FIRST ID', user.id);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(function (user) {
            done(null, user);
        })
        .catch(function (err) {
            done(err);
        });
});
exports.getToken = (user) => {
    return jwt.sign(user, config.JWT_SECRET, { expiresIn: 3600 });
};
exports.checkLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.send({ message: "Already Logout." });
        next()
    }

}
exports.isLocalAuthenticated =
    function (req, res, next) {
        // console.log(req,"is local authenticated");
        passport.authenticate('local', function (err, user, info, done) {
            if (err) { return next(err); }
            if (!user) {
                next(new Error("User Doesn't Exist"))
            }
            next()
        })(req, res, next);
    }
exports.isAdmin = (req, res, next) => {
    // console.log("user", req)
    try {
        User.findOne({ _id: req.user })
            .populate("role")
            .populate({
                path: "role",
                populate: {
                    path: "permissions",
                    model: "Permissions"
                }
            })
            .then((user) => {
                // console.log("user middlewear", user?.role?.title );
                if (user?.role?.title == "Admin") {
                    next();
                } else {
                    res.send('You are not authorized to perform this operation!');
                }
            }, (err) => {
                next(err)
            })
            .catch((err) => {
                res.send('You are not authorized to perform this operation!');
            });
    }
    catch (err) {
        console.log("user error")
        res.send('You are not authorized to perform this operation!');

    }
};