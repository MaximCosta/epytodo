const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json({ msg: "No token, authorization denied" });
    jwt.verify(token, process.env.SECRET, (err, user) => {
        console.log(err);
        if (err) return res.status(403).json({ msg: "Token is not valid" });
        req.user = user;
        next();
    });
}

module.exports = { generateAccessToken, authenticateToken };
