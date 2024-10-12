const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user"); // We are importing thr user routes 
const empRoutes = require("./routes/employee"); // Same for this importind employee from user

const app = express();
const DB_CONNECTION_STRING = "mongodb+srv://ommakwana1825:RQEoabuSC9IndGiK@cluster0.ef2mn.mongodb.net/Assignment01?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING, {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: ", err);
});

const SERVER_PORT = 8091;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user/", userRoutes); // Now Adding User routes
app.use("/api/v1/emp", empRoutes); // Adding Employee routes


app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>");
    });


app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
