// const express = require('express');
// const connectDB = require('./config/db');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const userRoutes = require('./routes/router');
// const { getAllUsers, getSingleUser } = require('./routes/userRoutes');

// console.log('userroutes', userRoutes)

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Routes
// // app.use('/api/users', userRoutes);
// app.get('/api/users/getAllUsers', getAllUsers)
// app.get('/api/users/singleuser/:username', getSingleUser)



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Initialize dotenv for environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb+srv://admin:admin@cluster0.hlh1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit the process if DB connection fails
  });

// Create a Schema and Model
const FormDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  socialMedia: { type: String, required: true },
  aboutYou: { type: String, required: true },
  businessInfo: { type: String, required: true },
});

const FormData = mongoose.model("FormData", FormDataSchema);

// API endpoint to handle form submission
app.post("/submit-form", async (req, res) => {
  try {
    const { name, email, mobile, socialMedia, aboutYou, businessInfo } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !socialMedia || !aboutYou || !businessInfo) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const formData = new FormData({ name, email, mobile, socialMedia, aboutYou, businessInfo });
    await formData.save();

    res.status(200).send({ message: "Form submitted successfully" });
  } catch (err) {
    console.error("Error while submitting form:", err.message);
    res.status(500).send({ error: "Failed to submit form" });
  }
});



// Retrieve user details by name
app.get("/user/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const userData = await FormData.findOne({ name });
  console.log(name);
      if (!userData) {
        return res.status(404).send({ message: "User not found" });
      }
  
      res.status(200).send(userData);
    } catch (err) {
      res.status(500).send({ error: "Failed to fetch user details" });
    }
  });


  // Retrieve all users
app.get("/users", async (req, res) => {
    try {
      const users = await FormData.find(); // Fetch all users from the database
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({ error: "Failed to fetch users" });
    }
  });
  
  // Check if name already exists
app.get("/check-name/:name", async (req, res) => {
    const { name } = req.params;
  
    try {
      const existingUser = await FormData.findOne({ name });
  
      if (existingUser) {
        return res.status(400).send({ error: "Name already exists" });
      }
  
      res.status(200).send({ message: "Name is available" });
    } catch (err) {
      res.status(500).send({ error: "Failed to check name" });
    }
  });
  
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





