const express = require("express");
const userModel = require("../models/user-model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

router.post("/create", async function (req, res) {
  let { username, email, password, confirmPassword, picture } = req.body;
  console.log("have a look", req.body);

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.json({ error: "Email already exists" });
    }

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = new userModel({
          username,
          email,
          password: hash,
          picture,
        });

        await newUser.save();

        const token = jwt.sign({ email, id: newUser._id }, "secret", {
          expiresIn: "1h",
        });

        res.cookie("token", token);

        const userdetails = {
          username: newUser.username,
          userId: newUser._id,
        };

        res.status(200).json({
          message: "User created and logged in successfully",
          success: true,
          user: userdetails,
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async function (req, res) {
  let { email, password } = req.body;
  console.log("have a look", req.body);

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ error: "User does not exist" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ email, id: user._id }, "secret", {
          expiresIn: "1h",
        });
        res.cookie("token", token);
        
        const userdetails = {
          username: user.username,
          userId: user._id,
        };
        res.status(200).json({
          message: "User logged in successfully",
          success: true,
          user: userdetails,
        });
      } else {
        res.json({ error: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getuser/:userId", async function (req, res) {
  let userId = req.params.userId;
  console.log("have a look", req.body);
  try {
    let user = await userModel.findById(userId).populate("urls");
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    res.status(200).json({username: user.username, email: user.email, points: user.points, urls: user.urls, message: user.messages,});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
