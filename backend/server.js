const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Profile = require("./models/Profile"); // <-- Import your Profile model
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/profile", profileRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// GET profile
app.get("/api/profile", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE profile
app.put("/api/profile", async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      {},               // find first profile
      req.body,         // update with new data
      { new: true }     // return updated profile
    );

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});