const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username)
    return res
      .status(400)
      .json({ message: "Username field should not be empty." });

  if (/\s/.test(username))
    return res
      .status(400)
      .json({ message: "Username should not contain any whitespaces." });

  if (!/^[a-zA-z0-9_]+$/.test(username))
    return res.status(400).json({
      message:
        "Alphanumeric and underscores are the only allowed values for a username.",
    });

  if (!password)
    return res
      .status(400)
      .json({ message: "Password field should not be empty." });

  if (password.length < 8)
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });

  try {
    const match = await User.findOne({ username: username }).exec();
    if (match)
      return res.status(409).json({ message: "Username is already taken!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });
    console.log(newUser.username + " created!");
    return res.status(201).json({
      message: `User ${username} created!`,
      user: { username: username, id: newUser._id },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
