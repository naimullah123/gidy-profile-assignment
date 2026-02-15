const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  name: String,

  bio: String,

  profilePic: String,

  skills: [String],

  socialLinks: {
    linkedin: String,
    github: String
  },

  experience: {
    title: String,
    company: String
  },

  education: [
    {
      degree: String,
      college: String,
      duration: String
    }
  ],

  certifications: [
    {
      title: String,
      provider: String,
      date: String
    }
  ]

});

module.exports = mongoose.model("Profile", profileSchema);
