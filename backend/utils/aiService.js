const axios = require("axios");

async function analyzeResume(job, resumePath) {
  // Dummy AI logic (replace with real Azure API call)
  return {
    skills: ["JavaScript", "MongoDB", "Node.js"],
    experience: 3,
    score: Math.floor(Math.random() * 100),
    comments: "Good match for " + job.title
  };
}

async function rankCandidates(job, resumes) {
  return resumes
    .map(r => ({
      candidateName: r.candidateName,
      experience: r.experience,
      skills: r.skills,
      relevanceScore: r.aiScore,
      comments: r.aiComments,
      resumeLink: r.resumePath
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

module.exports = { analyzeResume, rankCandidates };
