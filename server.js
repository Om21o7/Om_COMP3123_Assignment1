const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user"); // Import user routes
const empRoutes = require("./routes/employee"); // Import employee routes

const app = express();
const DB_CONNECTION_STRING = "mongodb+srv://ommakwana1825:RQEoabuSC9IndGiK@cluster0.ef2mn.mongodb.net/Assignment01?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING)
  .then(() => {
      console.log("Connected to MongoDB");
  })
  .catch((err) => {
      console.log("Error: ", err);
  });

const SERVER_PORT = 8091;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRoutes); // User routes
app.use("/api/v1/emp", empRoutes); // Employee routes

// Root route
app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>");
    });

// Start the server
app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
