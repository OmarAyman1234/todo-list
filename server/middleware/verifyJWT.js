const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const normalizedHeader =
    authHeader.startsWith("Bearer") && authHeader.length === 6 //6 refers to "Bearer" only.
      ? "Bearer "
      : authHeader;

  if (!normalizedHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden, client should request a new access token.

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyJWT;
