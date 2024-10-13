const mongoose = require("mongoose");

const DB_URI = "mongodb://localhost:27017/auth_demo";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log("COnnected to Mongodb");
  } catch (error) {
    console.error("Failed to connect to Mongodb", error);
    process.exit(1);
  }
};

module.exports = connectDB;
