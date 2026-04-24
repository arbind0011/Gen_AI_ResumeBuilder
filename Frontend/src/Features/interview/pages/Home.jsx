import React, {useState, useRef} from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {

  const {loading, generateReport, reports} = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const resumeInputRef = useRef()

  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    try {
      const resumeFile = resumeInputRef.current.files[0]
      if (!resumeFile) {
        alert("Please select a resume file")
        return
      }
      const data = await generateReport({jobDescription, selfDescription, resumeFile})
      if (data && data._id) {
        navigate(`/interview/${data._id}`)
      } else {
        alert("Failed to generate report. Please try again.")
      }
    } catch (error) {
      console.error("Report generation failed:", error)
      alert(error.message || "Failed to generate report. Please make sure you are logged in.")
    }
  }

  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  if(loading) {
    return (
      <main className="loading-screen">
        <div className="loading-container">
          <h1 className="loading-text">Generating Your Interview Strategy...</h1>
          <p className="loading-subtext">This may take around 30 seconds. Please wait.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="form-wrapper">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">
            Create Your Custom <span className="accent">Interview Plan</span>
          </h1>
          <p className="page-subtitle">
            Let our AI analyze the job requirements and your unique profile to<br />
            build a winning strategy.
          </p>
        </div>

        {/* Form Container */}
        <div className="interview-input-group">
          {/* Left Panel */}
          <div className="left">
            <div className="section-header">
              <h2 className="section-heading">Target Job Description</h2>
              <span className="badge required-badge">REQUIRED</span>
            </div>
            <label htmlFor="description" className="field-label">
              Paste the full job description here...
            </label>
            <textarea
              onChange={(e) => {setJobDescription(e.target.value)}}
              name="description"
              id="description"
              placeholder="e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              className="job-description-textarea"
            ></textarea>
            <div className="char-count">0 / 5000 chars</div>
          </div>

          {/* Right Panel */}
          <div className="right">
            <div className="section-header">
              <h2 className="section-heading">Your Profile</h2>
            </div>

            {/* Resume Upload */}
            <div className="input-group resume-group">
              <div className="group-header">
                <p className="group-title">Upload Resume</p>
                <span className="badge best-results-badge">BEST RESULTS</span>
              </div>
              
              <label
                className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
                htmlFor="resume"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {fileName ? (
                  <>
                    <span className="upload-icon">✓</span>
                    <span className="upload-text">{fileName}</span>
                  </>
                ) : (
                  <>
                    <span className="upload-icon">📎</span>
                    <span className="upload-text">Click to upload or drag & drop</span>
                    <span className="upload-hint">PDF or DOCX (Max 5MB)</span>
                  </>
                )}
              </label>
              <input ref={resumeInputRef} hidden type="file" id="resume" name="resume" accept=".pdf,.docx" onChange={handleFileSelect}/>
            </div>

            {/* OR Divider */}
            <div className="or-divider">OR</div>

            {/* Self Description */}
            <div className="input-group self-description-group">
              <label htmlFor="self-description" className="group-title">
                Quick Self-Description
              </label>
              <textarea
                onChange={(e) => {setSelfDescription(e.target.value)}}
                id="self-description"
                name="self-description"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                className="self-description-textarea"
              ></textarea>
            </div>

            {/* Info Box */}
            <div className="info-box">
              <span className="info-icon">ℹ️</span>
              <span className="info-text">
                Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
              </span>
            </div>

            {/* Generate Button */}
            <button onClick={handleGenerateReport} className="btn primary-btn">
              <span className="btn-icon">⚡</span>
              Generate My Interview Strategy
            </button>

            {/* Footer Info */}
            <div className="footer-info">
              AI-Powered Strategy Generation · Approx 30s
            </div>
          </div>
        </div>
      </div>

      {/* Recent reports lists */}
            {reports.length > 0 && (
              <div className="recent-reports">
                <h3 className="section-title">Recent Reports</h3>
                <ul className="reports-list">
                  {reports.map((report) => {
                    let scoreClass = 'high';
                    if (report.matchScore < 50) scoreClass = 'low';
                    else if (report.matchScore < 75) scoreClass = 'medium';
                    
                    return (
                      <li key={report._id} className="report-item" onClick={() => navigate(`/interview/${report._id}`)}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.6rem'}}>
                          <span className="report-icon">📄</span>
                          <span className="report-title">{report.title}</span>
                        </div>
                        <div className="report-meta">
                          <span className="report-date">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </span>
                          {report.matchScore && (
                            <span className={`report-score ${scoreClass}`}>
                              {report.matchScore}%
                            </span>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
    </main>
  );
};

export default Home;
