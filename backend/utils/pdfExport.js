const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

async function generatePDF(resume) {
  const doc = new PDFDocument();
  const pdfPath = path.join(__dirname, `../uploads/resumes/report-${resume._id}.pdf`);
  doc.pipe(fs.createWriteStream(pdfPath));

  doc.fontSize(18).text("Candidate Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Name: ${resume.candidateName}`);
  doc.text(`Job Applied: ${resume.jobId.title}`);
  doc.text(`Experience: ${resume.experience} years`);
  doc.text(`Skills: ${resume.skills.join(", ")}`);
  doc.text(`AI Score: ${resume.aiScore}`);
  doc.text(`Comments: ${resume.aiComments}`);

  doc.end();
  return pdfPath;
}

module.exports = { generatePDF };
