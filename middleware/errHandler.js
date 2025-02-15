const { format } = require("date-fns");
const ErrLog = require("../model/ErrLog");

const errHandler = async (err, req, res, next) => {
  try {
    const errDateTime = new Date();

    await ErrLog.create({
      date: format(errDateTime, "yyyy-MM-dd"),
      time: format(errDateTime, "HH:mm:ss:SSS, OOOO"),
      reqMethod: req.method,
      reqHeadersOrigin: req.headers.origin || "Unknown",
      reqUrl: req.url,
      reqIp: req.ip,
      errName: err.name,
      errMessage: err.message,
      reqLogId: req.id || "",
    });

    console.log(err.message);
    res.status(500).send(err.message);
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = errHandler;
