const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const Users = require("../models/Users");

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
module.exports = {
    login,
    postUser, profile
};