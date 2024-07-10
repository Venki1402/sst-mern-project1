const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User registered");
  } catch (error) {
    console.log(error);
    res.send("User registration failed");
  }
});

router.post("/login", async (req, res) => {});

module.exports = router;
