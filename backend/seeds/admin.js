const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/user.model");

const createAdmin = async () => {
  try {
    //connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    //check admin
    const admin = await User.findOne({
      role: "admin",
    });

    if (admin) {
      console.log("Admin Already Exists");
      process.exit();
    }

    //hash password
    const hashedPassword = await bcrypt.hash("Admin@1234", 10);

    //create Admin
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      phone: "9313733675",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin Created Successfully");
    process.exit();
  } catch (error) {
    console.log("Admin Creation Failed");
    console.log(error.message);

    process.exit(1);
  }
};

createAdmin();
