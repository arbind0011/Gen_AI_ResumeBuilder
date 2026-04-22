const resume = `
    personalInfo: {
      fullName: "Alex Rivers",
      email: "alex.rivers.dev@example.com",
      phone: "+1 (555) 012-3456",
      location: "San Francisco, CA",
      portfolio: "https://arivers.dev",
      github: "github.com/arivers-codes"
    },
    education: [
      {
        institution: "Tech Institute of California",
        degree: "B.S. in Computer Science",
        graduationYear: "2022",
        gpa: "3.8/4.0"
      }
    ],
    skills: {
      languages: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
      frameworks: ["React", "Node.js", "Express", "Next.js", "Tailwind CSS"],
      tools: ["Docker", "AWS (S3, EC2)", "Git", "PostgreSQL", "Redis"]
    },
    experience: [
      {
        company: "CloudStream Systems",
        role: "Software Engineer",
        duration: "June 2022 - Present",
        highlights: [
          "Architected a real-time analytics dashboard using React and WebSocket, reducing data latency by 40%.",
          "Optimized backend PostgreSQL queries, resulting in a 25% improvement in API response times.",
          "Led the migration of legacy REST services to a microservices architecture using Docker."
        ]
      },
      {
        company: "ByteSize Apps",
        role: "Junior Web Developer",
        duration: "May 2021 - May 2022",
        highlights: [
          "Developed responsive UI components using Tailwind CSS and React for a high-traffic e-commerce platform.",
          "Automated CI/CD pipelines using GitHub Actions, decreasing deployment errors by 15%."
        ]
      }
    ]
  },`

const selfDescription = `I am a results-oriented Software Engineer with 3+ years of experience building scalable web applications. 
                         I specialize in full-stack JavaScript development and have a passion for optimizing system performance and mentoring junior developers. 
                         I thrive in agile environments where clean code and architectural integrity are prioritized.`

const jobDescription =
    `title: "Senior Full-Stack Developer",
    company: "InnovateX Solutions",
    requirements: [
      "Minimum 5 years of experience with React and Node.js.",
      "Proven track record of managing cloud infrastructure (AWS/GCP).",
      "Experience with system design and architectural patterns.",
      "Strong understanding of CI/CD pipelines and DevOps best practices."
    ],
    responsibilities: [
      "Lead a team of 4 developers in building a next-gen fintech platform.",
      "Collaborate with product managers to define technical requirements.",
      "Conduct rigorous code reviews and ensure high test coverage."
    ]
  }
}`

module.exports = {
    resume,
    selfDescription,
    jobDescription
}