const jwt = require("jsonwebtoken");
const config = require("./server/config/config");

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).send({ status: false, message: "Access denied. Token missing." });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        if (req.user.role !== "Admin") {
            return res.status(403).send({ status: false, message: "Access denied. Insufficient role." });
        }
        next();
    } catch (err) {
        return res.status(403).send({ status: false, message: "Access denied. Invalid token." });
    }
};
module.exports = {
    authenticateToken
};
