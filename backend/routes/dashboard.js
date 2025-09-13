
// const express = require("express");
// const authMiddleware = require("../middleware/authMiddleware");
// const Job = require("../models/Job");
// const Resume = require("../models/Resume");
// const User = require("../models/User");

// const router = express.Router();

// router.get("/stats", authMiddleware, async (req, res) => {
//   try {
//     // Count total jobs
//     const jobsCount = await Job.countDocuments();

//     // Count total resumes uploaded
//     const resumesCount = await Resume.countDocuments();

//     // Count total candidate users
//     const candidatesCount = await User.countDocuments({ role: "candidate" });

//     // Count distinct candidates who applied (uploaded resume)
//     const candidatesAppliedCountAgg = await Resume.aggregate([
//       { $group: { _id: "$candidateName" } },
//       { $count: "count" }
//     ]);
//     const candidatesAppliedCount = candidatesAppliedCountAgg.length > 0 ? candidatesAppliedCountAgg[0].count : 0;

//     res.json({
//       jobs: jobsCount,
//       resumes: resumesCount,
//       candidates: candidatesCount,
//       candidatesApplied: candidatesAppliedCount
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;


// backend/routes/dashboard.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../models/Job");
const Resume = require("../models/Resume");
const User = require("../models/User");

const router = express.Router();

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const jobsCount = await Job.countDocuments();
    console.log("Jobs count:", jobsCount);

    const resumesCount = await Resume.countDocuments();
    console.log("Resumes count:", resumesCount);

    const candidatesCount = await User.countDocuments({ role: "candidate" });
    console.log("Candidates count:", candidatesCount);

    const candidatesAppliedCountAgg = await Resume.aggregate([
      { $group: { _id: "$candidateName" } },
      { $count: "count" }
    ]);
    const candidatesAppliedCount = candidatesAppliedCountAgg.length > 0 ? candidatesAppliedCountAgg[0].count : 0;
    console.log("Candidates applied count:", candidatesAppliedCount);

    res.json({
      jobs: jobsCount,
      resumes: resumesCount,
      candidates: candidatesCount,
      candidatesApplied: candidatesAppliedCount
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
