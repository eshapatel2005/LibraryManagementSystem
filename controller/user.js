const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    validateCreateUser,
    validateGetUser,
    validateUpdateUser,
    validateLoginUser
} = require("../validation/user");


// Create User
const createUser = async (req, res) => {
    try {

        const { error } = validateCreateUser(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        req.body.password = hashedPassword;

        // Create User
        const user = await User.create(req.body);

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id },
            process.env.USER_AUTH_TOKEN
        );

        // Save Token
        user.token = token;
        await user.save();

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Get All Users
const getUsers = async (req, res) => {
    try {

        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Users Fetched Successfully",
            data: users
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Get User By ID
const getUserById = async (req, res) => {
    try {

        const { error } = validateGetUser(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Fetched Successfully",
            data: user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Update User
const updateUser = async (req, res) => {
    try {

        const { error } = validateUpdateUser(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Delete User
const deleteUser = async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// Login User
const loginUser = async (req, res) => {
    try {

        // Validation
        const { error } = validateLoginUser(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        // Check Email
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        // Check Password
        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id },
            process.env.USER_AUTH_TOKEN
        );

        // Save Token
        user.token = token;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token: token
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};