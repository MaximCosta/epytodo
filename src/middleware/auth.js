const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json({ msg: "No token, authorization denied" });
    jwt.verify(token, process.env.SECRET, (err, email) => {
        if (err) return res.status(403).json({ msg: "Token is not valid" });
        req.email = email;
        next();
    });
};

module.exports = { authenticateToken };
