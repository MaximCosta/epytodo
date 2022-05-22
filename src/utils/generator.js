const jwt = require("jsonwebtoken");

const generateAccessToken = (email) => {
    return jwt.sign(email, process.env.SECRET);
};

module.exports = { generateAccessToken };
