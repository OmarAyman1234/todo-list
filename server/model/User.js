const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: Array, default: ["User"] },
    refreshTokens: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
