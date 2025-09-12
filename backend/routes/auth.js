const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecret } = require("../config");

const router = express.Router();

// Signup (register + return token)
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPass, role });
    await user.save();

    const token = jwt.sign(
      { user: { id: user._id, role: user.role, username: user.username } },
      jwtSecret,
      { expiresIn: "1d" }
    );
    

    res.json({
      message: "User registered successfully",
      token,
      role: user.role,
      username: user.username
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { user: { id: user._id, role: user.role, username: user.username } },
      jwtSecret,
      { expiresIn: "1d" }
    );
    

    res.json({ token, role: user.role, username: user.username });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
