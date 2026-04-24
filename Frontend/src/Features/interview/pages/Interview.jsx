import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'

const Interview = () => {
  const { interviewId } = useParams()
  const [activeTab, setActiveTab] = useState('technical')
  const { report, loading, getReportById } = useInterview()
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  const {
    matchScore = 0,
    technicalQuestions = [],
    behaviouralQuestions = [],
    skillGaps = [],
    preparationPlan = [],
    title = 'Interview Preparation'
  } = report || {}

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  if (loading) {
    return (
      <main className="interview">
        <div className="interview-container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            fontSize: '1.5rem',
            color: '#cbd5e1'
          }}>
            Loading interview report...
          </div>
        </div>
      </main>
    )
  }

  if (!report) {
    return (
      <main className="interview">
        <div className="interview-container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            fontSize: '1.5rem',
            color: '#ef4444'
          }}>
            Interview report not found
          </div>
        </div>
      </main>
    )
  }

    const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#ec4899'
      case 'medium':
        return '#f59e0b'
      case 'low':
        return '#10b981'
      default:
        return '#6366f1'
    }
  }

  return (
    <main className="interview">
      <div className="interview-container">
        {/* Header */}
        <div className="interview-header">
          <div className="header-content">
            <h1 className="interview-title">{title}</h1>
            <div className="score-badge">
              <span className="score-label">Match Score</span>
              <span className="score-value">{matchScore}%</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="interview-layout">
          {/* Left Sidebar */}
          <aside className="left-sidebar">
            <nav className="sidebar-nav">
              <div className="nav-section">
                <h3 className="nav-title">Question Types</h3>
                <button
                  className={`nav-item ${activeTab === 'technical' ? 'active' : ''}`}
                  onClick={() => setActiveTab('technical')}
                >
                  <span className="nav-icon">💻</span>
                  <span className="nav-label">Technical</span>
                  <span className="nav-count">{technicalQuestions.length}</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'behavioural' ? 'active' : ''}`}
                  onClick={() => setActiveTab('behavioural')}
                >
                  <span className="nav-icon">🎯</span>
                  <span className="nav-label">Behavioral</span>
                  <span className="nav-count">{behaviouralQuestions.length}</span>
                </button>
              </div>

              <div className="nav-section">
                <h3 className="nav-title">Resources</h3>
                <button
                  className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
                  onClick={() => setActiveTab('roadmap')}
                >
                  <span className="nav-icon">🗺️</span>
                  <span className="nav-label">Road Map</span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => setActiveTab('skills')}
                >
                  <span className="nav-icon">⚠️</span>
                  <span className="nav-label">Skill Gaps</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <section className="main-content">
            {/* Technical Questions */}
            {activeTab === 'technical' && (
              <div className="content-section">
                <div className="section-header">
                  <h2 className="section-title">Technical Questions</h2>
                  <span className="section-badge">{technicalQuestions.length} Questions</span>
                </div>
                <div className="questions-list">
                  {technicalQuestions.map((q, idx) => (
                    <div key={idx} className="question-card">
                      <div
                        className="question-header"
                        onClick={() => toggleQuestion(`tech-${idx}`)}
                      >
                        <div className="question-content">
                          <h3 className="question-text">{q.question}</h3>
                          <p className="question-intention">💡 {q.intention}</p>
                        </div>
                        <button className="expand-btn">
                          {expandedQuestion === `tech-${idx}` ? '▼' : '▶'}
                        </button>
                      </div>
                      {expandedQuestion === `tech-${idx}` && (
                        <div className="question-answer">
                          <div className="answer-label">Suggested Answer:</div>
                          <p className="answer-text">{q.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Behavioral Questions */}
            {activeTab === 'behavioural' && (
              <div className="content-section">
                <div className="section-header">
                  <h2 className="section-title">Behavioral Questions</h2>
                  <span className="section-badge">{behaviouralQuestions.length} Questions</span>
                </div>
                <div className="questions-list">
                  {behaviouralQuestions.map((q, idx) => (
                    <div key={idx} className="question-card">
                      <div
                        className="question-header"
                        onClick={() => toggleQuestion(`behav-${idx}`)}
                      >
                        <div className="question-content">
                          <h3 className="question-text">{q.question}</h3>
                          <p className="question-intention">💡 {q.intention}</p>
                        </div>
                        <button className="expand-btn">
                          {expandedQuestion === `behav-${idx}` ? '▼' : '▶'}
                        </button>
                      </div>
                      {expandedQuestion === `behav-${idx}` && (
                        <div className="question-answer">
                          <div className="answer-label">Suggested Answer:</div>
                          <p className="answer-text">{q.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Road Map */}
            {activeTab === 'roadmap' && (
              <div className="content-section">
                <div className="section-header">
                  <h2 className="section-title">Preparation Road Map</h2>
                  <span className="section-badge">{preparationPlan.length} Days</span>
                </div>
                <div className="roadmap-timeline">
                  {preparationPlan.map((plan, idx) => (
                    <div key={idx} className="roadmap-day">
                      <div className="day-marker">
                        <span className="day-number">Day {plan.day}</span>
                      </div>
                      <div className="day-content">
                        <h3 className="day-title">{plan.focus}</h3>
                        <ul className="tasks-list">
                          {plan.tasks?.map((task, taskIdx) => (
                            <li key={taskIdx} className="task-item">
                              <span className="task-dot">•</span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skill Gaps */}
            {activeTab === 'skills' && (
              <div className="content-section">
                <div className="section-header">
                  <h2 className="section-title">Identified Skill Gaps</h2>
                  <span className="section-badge">{skillGaps.length} Skills</span>
                </div>
                <div className="skills-grid">
                  {skillGaps.map((gap, idx) => (
                    <div
                      key={idx}
                      className={`skill-card skill-${gap.severity}`}
                      style={{
                        borderLeftColor: getSeverityColor(gap.severity)
                      }}
                    >
                      <div className="skill-header">
                        <h3 className="skill-name">{gap.skill}</h3>
                        <span
                          className="severity-badge"
                          style={{
                            backgroundColor: `${getSeverityColor(gap.severity)}20`,
                            color: getSeverityColor(gap.severity)
                          }}
                        >
                          {gap.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Right Sidebar - Quick Stats */}
          <aside className="right-sidebar">
            <div className="stats-card">
              <h3 className="stats-title">Quick Stats</h3>
              <div className="stat-item">
                <span className="stat-label">Technical Q:</span>
                <span className="stat-value">{technicalQuestions.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Behavioral Q:</span>
                <span className="stat-value">{behaviouralQuestions.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Days Plan:</span>
                <span className="stat-value">{preparationPlan.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Skill Gaps:</span>
                <span className="stat-value">{skillGaps.length}</span>
              </div>
            </div>

            <div className="gap-severity-card">
              <h3 className="stats-title">Gap Severity</h3>
              <div className="severity-breakdown">
                {['high', 'medium', 'low'].map((sev) => (
                  <div key={sev} className="severity-item">
                    <div className="severity-indicator" style={{ backgroundColor: getSeverityColor(sev) }}></div>
                    <span className="severity-label">{sev.charAt(0).toUpperCase() + sev.slice(1)}</span>
                    <span className="severity-count">
                      {skillGaps.filter(g => g.severity === sev).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Interview