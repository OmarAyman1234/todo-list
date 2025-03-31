const User = require("../model/User");

async function getAllUsers(req, res) {
  try {
    const users = await User.find().exec();
    if (!users || users.length === 0) return res.sendStatus(204);

    return res.json(users);
  } catch (err) {
    console.log(err.stack);
    return res.sendStatus(500);
  }
}

module.exports = { getAllUsers };
