require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 4444;

const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");

const cookieParser = require("cookie-parser");

const path = require("path");

const reqLogger = require("./middleware/reqLogger");
const errHandler = require("./middleware/errHandler");

const verifyJWT = require("./middleware/verifyJWT.js");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");

connectDB();

app.use(reqLogger);

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/", require("./routes/root.js"));
app.use("/register", require("./routes/register.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/refresh", require("./routes/refresh.js"));
app.use("/logout", require("./routes/logout.js"));

app.use(verifyJWT);
app.use("/api/todos", require("./routes/api/todos.js"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html"))
    // res.sendFile(path.join(__dirname, "pages", "404.html"));
    res.send("Not Found!");
  else if (req.accepts("json")) res.json({ error: "404 not found" });
  else res.type("txt").send("404 not found");
});

app.use(errHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
  });
});
