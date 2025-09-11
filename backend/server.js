const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const resumeRoutes = require("./routes/resume");
const bestFitRoutes = require("./routes/bestfit");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads/resumes", express.static(path.join(__dirname, "uploads/resumes")));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/bestfit", bestFitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
