const express = require("express");
const router = express.Router();
const User = require("../models/User");

//POST 201 SIGNUP
router.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST 200 LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not Found",
      });
    }

    if (user.password === password) {
      return res.status(200).json({
        status: true,
        username: `${username}`,
        message: "User logged in successfully",
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Invalid password.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
