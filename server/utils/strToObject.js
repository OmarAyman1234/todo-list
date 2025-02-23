const mongoose = require("mongoose");

const strToObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
    ? new mongoose.Types.ObjectId(String(id)) // explicit casting to string to assure mongoose this is a string not a number.
    : null;
};

module.exports = strToObjectId;
