const User = require("../model/User");

const handleLogout = async (req, res) => {
  if (!req.cookies?.jwt) return res.sendStatus(403);

  const refreshToken = req.cookies.jwt;
  const foundUser = await User.findOne({
    refreshTokens: { $in: [refreshToken] },
  }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return res.sendStatus(204);
  }

  const remainingTokens = foundUser.refreshTokens.filter(
    (token) => token !== refreshToken
  );
  foundUser.refreshTokens = remainingTokens;
  await foundUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res.sendStatus(204);
};

module.exports = { handleLogout };
