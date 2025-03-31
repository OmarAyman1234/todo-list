const express = require("express");
const strToObjectId = require("../../utils/strToObject");
const router = express.Router();
const User = require("../../model/User");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const userId = strToObjectId(req.userId);
    if (!userId || !mongoose.isValidObjectId(userId))
      return res.sendStatus(400);

    const user = await User.findOne({ _id: userId }).exec();
    if (!user) return res.sendStatus(404);

    return res.json({ username: user.username, roles: user.roles });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
