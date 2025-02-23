const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  if (!req.cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = req.cookies.jwt;

  const foundUser = await User.findOne({
    refreshTokens: { $in: [refreshToken] },
  }).exec();

  if (!foundUser) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.userId !== foundUser._id.toString())
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      { userId: foundUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    return res.json({
      username: foundUser.username,
      id: foundUser._id,
      accessToken,
    });
  });
};

module.exports = { handleRefreshToken };
