const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.userRoles) return res.sendStatus(401);
    const userRoles = req.userRoles;
    const result = userRoles.some((role) => allowedRoles.includes(role));
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
