const express = require("express");
const multer = require("multer");
const Resume = require("../models/Resume");
const Job = require("../models/Job");
const { analyzeResume } = require("../utils/aiService");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/resumes"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Upload resume
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { candidateName, jobId } = req.body;
    const job = await Job.findById(jobId);

    const aiResult = await analyzeResume(job, req.file.path);

    const resume = new Resume({
      candidateName,
      jobId,
      resumePath: req.file.path,
      skills: aiResult.skills,
      experience: aiResult.experience,
      aiScore: aiResult.score,
      aiComments: aiResult.comments
    });

    await resume.save();
    res.json(resume);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
