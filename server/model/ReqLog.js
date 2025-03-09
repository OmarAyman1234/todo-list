const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqlogsSchema = new Schema({
  date: { type: Date, default: Date.now },
  method: String,
  headersOrigin: String,
  url: String,
  // ip: String,
  // country: String,
  // city: String,
});

module.exports = mongoose.model("ReqLog", reqlogsSchema);
