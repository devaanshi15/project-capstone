const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  candidateName: String,
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  resumePath: String,
  skills: [String],
  experience: Number,
  aiScore: Number,
  aiComments: String
}, { timestamps: true });

module.exports = mongoose.model("Resume", ResumeSchema);
