const express = require("express");
const route = express.Router();
const path = require("path");

route.get("^/$|index(.html)?", (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "dist", "index.html"),
    (err) => {
      if (err) next(err);
    }
  );
});

module.exports = route;
