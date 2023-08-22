const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Users = require("./server/models/Users"); // Update the path if needed
const config = require('./server/config/config');

const localStrategyOptions = {
    usernameField: "email",
    passwordField: "password",
};

passport.use(
    new LocalStrategy(localStrategyOptions, async (email, password, done) => {
        try {
            const user = await Users.findOne({ email });
            if (!user) {
                return done(null, false, { message: "User not found" });
            }

            const isMatch = await user.comparePassword(password); // Define this method in your Users model
            if (!isMatch) {
                return done(null, false, { message: "Invalid email or password" });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

const jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET, // Replace with your actual secret key
};

passport.use(
    new JwtStrategy(jwtStrategyOptions, async (payload, done) => {
        try {
            const user = await Users.findById(payload.userId);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);
passport.checkRole = function (role) {
    return function (req, res, next) {
        if (req.user && req.user.role === role) {
            return next();
        } else {
            return res.status(403).json({ message: "Access denied" });
        }
    };
};

module.exports = passport;