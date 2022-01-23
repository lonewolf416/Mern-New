const express = require("express");
const router = express.Router();
const Model = require("../Model/User");
const bcrypt = require("bcrypt");
require("dotenv/config");
const auth = require("../auth");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!reg.test(email)) {
    res.json({ status: false, error: "Email address not valid" });
    return;
  }
  if (password != confirmPassword) {
    res.send({
      error: "Password Mismatched !",
    });
    return;
  }
  if (password.length <= 6) {
    res.send({
      error: "Password length should be greater than 5 characters",
    });
    return;
  }
  const encPassword = await bcrypt.hash(password, 10);

  try {
    const response = await Model.create({
      username,
      email,
      password: encPassword,
    });
    res.json({ status: true, data: response });
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Email already in use" });
    }
    if (error.name === "ValidationError") {
      const msg = error.message;
      const c = msg.replace("Post validation failed:", "");
      return res.json({ status: false, error: c });
    }
    throw error;
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Model.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: false, error: "Invalid email/password" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        email,
        password,
        user: user._id,
      },
      process.env.SECRET_KEY
      // {
      //   expiresIn: "2h",
      // }
    );

    return res.json({
      status: true,
      message: "Login Succesful",
      data: {
        token: token,
        user: { id: user._id, username: user.username, email: user.email },
      },
    });
  }
  //   return res.json({ status : false , })
});

router.post("/", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
