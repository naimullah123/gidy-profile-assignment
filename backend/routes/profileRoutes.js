const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// GET Profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE or UPDATE Profile
router.post("/", async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (profile) {
      profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
    } else {
      profile = new Profile(req.body);
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
