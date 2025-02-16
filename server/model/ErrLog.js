const mongoose = require("mongoose");
const { Schema } = mongoose;

const errlogsSchema = new Schema({
  date: { type: Date, default: Date.now },
  reqMethod: String,
  reqHeadersOrigin: String,
  reqUrl: String,
  reqIp: String,
  errName: String,
  errMessage: String,
  reqLogId: String,
});

module.exports = mongoose.model("ErrLog", errlogsSchema);
