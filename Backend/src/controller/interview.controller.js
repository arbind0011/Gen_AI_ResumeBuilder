const pdfParse = require("pdf-parse")
const { generateInterViewReport } = require("../services/ai.service")
const interViewReportModel = require("../models/interviewReport.model")


async function generateInterViewReportController(req,res) {
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText() 
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterViewReport({
        resume : resumeContent.text,
        selfDescription,
        jobDescription
    }) 

    const interviewReport = await interViewReportModel.create({
        user : req.user.id,
        resume : resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    }) 

    res.status(201).json({
        message : "Interview report generated successfully",
        interviewReport
    })
}


module.exports = { generateInterViewReportController }