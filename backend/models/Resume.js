const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeUrl: { type: String, required: true }, // store file path or URL
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", ResumeSchema);
