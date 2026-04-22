import React, { useState } from "react";
import "../style/home.scss";

const Home = () => {
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
              <input
                hidden
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.docx"
                onChange={handleFileSelect}
              />
            </div>

            {/* OR Divider */}
            <div className="or-divider">OR</div>

            {/* Self Description */}
            <div className="input-group self-description-group">
              <label htmlFor="self-description" className="group-title">
                Quick Self-Description
              </label>
              <textarea
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
            <button className="btn primary-btn">
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
    </main>
  );
};

export default Home;
