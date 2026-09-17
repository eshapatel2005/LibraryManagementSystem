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

// Create User
router.post("/", createUser);
// Login User
router.post("/login", loginUser);
// Get All Users
router.get("/", auth, getUsers);
// Get User By ID
router.get("/:id", auth, getUserById);
// Update User
router.put("/:id", updateUser);
// Delete User
router.delete("/:id", auth, deleteUser);


module.exports = router;