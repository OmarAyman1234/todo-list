const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser)
      return res.status(404).json({ message: `${username} was not found.` });

    const passwordMatched = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatched)
      return res.status(401).json({ message: "Incorrect password." });

    const accessToken = jwt.sign(
      { userId: foundUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Save refreshToken to DB

    //Keeping only valid tokens and removing the expired ones.
    const validTokens = foundUser.refreshTokens.filter((token) => {
      try {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        return true;
      } catch (err) {
        return false;
      }
    });
    //Assign the valid tokens + the new refresh token.
    foundUser.refreshTokens = validTokens;
    foundUser.refreshTokens.push(refreshToken);
    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "none",
    });

    return res.json({ accessToken });
  } catch (err) {
    return res.sendStatus(500);
  }
};

module.exports = { handleLogin };
