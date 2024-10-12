const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("../routes/user");
const empRoutes = require("../routes/employee");

const app = express();
const DB_CONNECTION_STRING = "mongodb+srv://ommakwana1825:RQEoabuSC9IndGiK@cluster0.ef2mn.mongodb.net/Assignment01?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/emp", empRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("<h1>MogoDB + Mongoose Example</h1>");
});

// Export the app for Vercel
module.exports = app;
