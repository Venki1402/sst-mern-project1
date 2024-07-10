const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword

    const newUser = new User(req.body);
    await newUser.save();
    res.send("User registered");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.send({
        success: false,
        message: "User doesn't exist"
      });
    }

    const validPassword = await bcrypt.compare(req.body.password, userExists.password);
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password"
      });
    }

    res.send({
      success: true,
      message: "User logged in"
    });
  }
  catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
