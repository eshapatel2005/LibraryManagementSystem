const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.adminAuth = async (req, res, next) => {

    try {

        const token = req.header("Authorization");

        const decode = jwt.verify(
            token,
            process.env.USER_AUTH_TOKEN
        );

        const findUser = await User.findById(decode.id);

        if (!findUser) {
            return res.status(401).json({
                message: "User Not Found"
            });
        }

        if (findUser.role !== "admin") {
            return res.status(403).json({
                message: "Admin Access Required"
            });
        }

        req.user = findUser;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid Token"
        });

    }

};