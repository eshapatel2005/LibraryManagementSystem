const express = require("express");

const router = express.Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
} = require("../controller/user");

const { auth } = require("../middleware/auth");
const { adminAuth } = require("../middleware/adminAuth");
const validation = require("../middleware/validation");

const {
    validateCreateUser,
    validateGetUser,
    validateUpdateUser,
    validateLoginUser
} = require("../validation/user");

// Create User
router.post(
    "/",
    validation(validateCreateUser),
    createUser
);

// Login User
router.post(
    "/login",
    validation(validateLoginUser),
    loginUser
);

// Get All Users
router.get("/", adminAuth, getUsers);

// Get User By ID
router.get(
    "/:id",
    auth,
    validation(validateGetUser, "params"),
    getUserById
);

// Update User
router.put(
    "/:id",
    validation(validateUpdateUser),
    updateUser
);

// Delete User
router.delete("/:id", auth, deleteUser);


module.exports = router;