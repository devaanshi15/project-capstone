const express = require("express");
const Resume = require("../models/Resume");
const Job = require("../models/Job");
const { rankCandidates } = require("../utils/aiService");
const { generatePDF } = require("../utils/pdfExport");

const router = express.Router();

// Best Fit Candidates
router.post("/", async (req, res) => {
  try {
    const { jobId, count } = req.body;
    const job = await Job.findById(jobId);
    const resumes = await Resume.find({ jobId });

    const ranked = await rankCandidates(job, resumes);

    res.json(ranked.slice(0, count));
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Export report as PDF
router.get("/report/:resumeId", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId).populate("jobId");
    const pdfPath = await generatePDF(resume);
    res.download(pdfPath);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
