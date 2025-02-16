const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1); // Stop the server if the connection failed
  }
};

mongoose.connection.on("disconnected", () => {
  console.error("MongoDB Disconnected. Server is shutting down...");
  process.exit(1); // Stop the server if the connection failed
});

module.exports = connectDB;
