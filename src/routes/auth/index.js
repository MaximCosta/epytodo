const { generateAccessToken } = require("../../utils/generator");
const { registerUser, loginUser } = require("../user/user.query");
const { checkParams, isEmail } = require("../../utils/validator");
const express = require("express");
const bcrypt = require("bcrypt");

const initRoute = (app) => {
    var auth = express.Router();

    auth.post("/register", (req, res) => {
        if (!checkParams(req, "post", [["email", isEmail], "password", "firstname", "name"])) return res.status(400).json({ msg: "Bad parameter" });
        let { email, password, firstname, name } = req.body;

        email = email.toLowerCase();
        password = bcrypt.hashSync(password, 10);

        registerUser(
            req,
            [email, password, firstname, name],
            () => res.status(201).json({ token: generateAccessToken(email) }),
            (code, msg) => res.status(code).json(msg)
        );
    });

    auth.post("/login", (req, res) => {
        if (!checkParams(req, "post", [["email", isEmail], "password"])) return res.status(400).json({ msg: "Bad parameter" });
        let { email, password } = req.body;

        email = email.toLowerCase();
        loginUser(
            req,
            [email, password],
            () => res.status(200).json({ token: generateAccessToken(email) }),
            (code, msg) => res.status(code).json(msg)
        );
    });

    app.use("/", auth);

    return auth;
};

module.exports.init = initRoute;
