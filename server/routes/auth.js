const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser)
      return res.status(404).json({ message: `${username} was not found.` });

    const passwordMatched = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatched)
      return res.status(401).json({ message: "Incorrect password." });

    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Save refreshToken to DB
    foundUser.refreshToken.push(refreshToken);
    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    return res.json({ accessToken });
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
