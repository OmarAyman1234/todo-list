const User = require("../model/User");

const handleLogout = async (req, res) => {
  if (!req.cookies?.jwt) return res.sendStatus(403);

  const refreshToken = req.cookies.jwt;

  // findOneAndUpdate: If no match, it will do nothing, so no crashing.

  await User.findOneAndUpdate(
    { refreshTokens: refreshToken }, // Find user that has this token in their array
    { $pull: { refreshTokens: refreshToken } }, // Remove only this specific token
    { new: true } // Return the updated document
  ).exec();

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  return res.sendStatus(204);
};

module.exports = { handleLogout };
