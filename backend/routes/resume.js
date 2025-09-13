const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const Resume = require("../models/Resume");
const Job = require("../models/Job");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/resumes/");
  },
  filename: function (req, file, cb) {
    // Use timestamp + original name to avoid collisions
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Ensure uploads folder exists
const fs = require("fs");
const uploadDir = "uploads/resumes";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Get all jobs (for dropdown)
router.get("/jobs", authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({}, "_id title");
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Upload resume endpoint
router.post("/upload", authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    const { candidateName, jobId } = req.body;
    if (!candidateName || !jobId) {
      return res.status(400).json({ msg: "Candidate name and jobId are required" });
    }
    if (!req.file) {
      return res.status(400).json({ msg: "Resume file is required" });
    }

    // Save resume info in DB
    const resume = new Resume({
      candidateName,
      jobId,
      uploadedBy: req.user.id,
      resumeUrl: req.file.path
    });
    await resume.save();

    res.json({ msg: "Resume uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
