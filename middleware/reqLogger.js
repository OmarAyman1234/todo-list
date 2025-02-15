const { format } = require("date-fns");
const ReqLog = require("../model/ReqLog");

const reqLogger = async (req, res, next) => {
  try {
    let reqLog = await ReqLog.create({
      method: req.method,
      headersOrigin: req.headers.origin || "Unknown",
      url: req.url,
      ip: req.ip,
    });
    // save the request's generated ObjectId by MongoDB to use at error handler if there is an error.
    req.id = reqLog._id;

    console.log(req.method, req.path);

    next();
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
};

module.exports = reqLogger;
