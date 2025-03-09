const ErrLog = require("../model/ErrLog");

const errHandler = async (err, req, res, next) => {
  try {
    await ErrLog.create({
      reqMethod: req.method,
      reqHeadersOrigin: req.headers.origin || "Unknown",
      reqUrl: req.url,
      // reqIp: req.ip,
      errName: err.name,
      errMessage: err.message,
      reqLogId: req.id || "",
    });

    console.log(err.stack);
    res.status(500).send(err.stack);
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = errHandler;
