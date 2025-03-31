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

  const cookieOptions = {
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
  } else {
    cookieOptions.secure = false;
    cookieOptions.sameSite = "lax";
  }
  res.clearCookie("jwt", cookieOptions);

  return res.sendStatus(204);
};

module.exports = { handleLogout };
