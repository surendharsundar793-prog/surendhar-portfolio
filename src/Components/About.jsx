import React from 'react'
import '../assets/Styles/about.css'
import profileImg from '../assets/img.webp'
import { motion } from 'framer-motion'

const coreTechs = [
  'AWS (EC2, EKS, VPC, IAM)',
  'Docker & Kubernetes',
  'Jenkins & GitHub Actions',
  'Terraform & Ansible',
  'Java & Spring Boot',
  'React.js & PostgreSQL',
];

const About = () => {
  return (
    <div className="about-section">
      <div className="about-container">
        <motion.div
          className="about-description-wrapper"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Numbered Editorial Heading */}
          <h2 className="bc-section-heading">
            <span className="bc-section-num">01.</span>
            <span>About Me</span>
          </h2>

          <div className="bc-about-inner">
            <div className="about-body">
              <p>
                Hi there! <strong> I am Surendhar S</strong>, a beginner  <strong>DevOps &amp; Cloud Engineer</strong> and <strong>Java Full-Stack Developer</strong>. I love connecting Backend application development to automated cloud infrastructure..
              </p>
              <p>
                My hands-on exposure spans building end-to-end full-stack web platforms, automating CI/CD delivery pipelines, provisioning cloud infrastructure, and setting up shift-left security, Blue-Green zero-downtime deployments, and real-time observability. I also actively incorporate AI-assisted workflows for faster prototyping, pipeline debugging, and infrastructure drafting.
              </p>

              <p className="about-tech-intro">
                Here are a few technologies I’ve been working with recently:
              </p>

              <ul className="about-tech-list">
                {coreTechs.map((tech) => (
                  <li key={tech}>
                    <span className="bc-bullet" aria-hidden="true">▹</span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Brittany-style Duotone Square Portrait with Offset Border */}
            <div className="bc-about-pic">
              <div className="bc-about-pic-wrapper cursor-target">
                <img
                  src={profileImg}
                  alt="Surendhar S"
                  className="bc-about-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
