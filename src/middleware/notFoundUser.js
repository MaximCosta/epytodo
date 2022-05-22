const { getUser } = require("../routes/user/user.query");

const notFoundUser = (req, res, next) => {
    let email = req.email;

    if (!email) return res.status(500).json({ msg: "Internal server error" });
    getUser(
        req,
        () => next(),
        (code, msg) => res.status(code).json(msg)
    );
};

module.exports = { notFoundUser };
