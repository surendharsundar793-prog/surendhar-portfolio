import React from 'react'
import { projectsData } from '../data/projectsData'
import '../assets/Styles/project.css'
import { Github } from 'lucide-react'
import { motion } from 'framer-motion'

const orderedProjects = [
  projectsData.find(p => p.id === 1), // Linkly URL Shortener & Analytics
  projectsData.find(p => p.id === 4), // Zero-Downtime Blue-Green Deployment
  projectsData.find(p => p.id === 3), // DevSecOps Observability & Pipeline
  projectsData.find(p => p.id === 2), // Employee Management System
  ...projectsData.filter(p => ![1, 2, 3, 4].includes(p.id))
].filter(Boolean);

const Project = () => {
  return (
    <div className="project-slide-container">
      <div className="projects-section-wrap">

        {/* Section Header */}
        <h2 className="bc-section-heading">
          <span className="bc-section-num">03.</span>
          <span>Some Things I’ve Built</span>
        </h2>

        {/* Brittany v4 Alternating 12-Column Z-Pattern Showcase */}
        <ul className="bc-featured-list">
          {orderedProjects.map((proj, idx) => (
            <motion.li
              key={proj.id}
              className="bc-featured-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Project Content Column */}
              <div className="bc-project-content">
                <p className="bc-project-overline"> {proj.category}</p>

                <h3 className="bc-project-title">
                  {proj.title}
                </h3>

                <div className="bc-project-desc-box">
                  <p>{proj.shortDesc || proj.tagline}</p>
                </div>

                <ul className="bc-project-tech-list">
                  {proj.tags.slice(0, 5).map((tag, tIdx) => (
                    <li key={tIdx}>{tag}</li>
                  ))}
                </ul>

                {proj.github && (
                  <div className="bc-project-links">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repository for ${proj.title}`}
                      title="GitHub Source Code"
                      className="cursor-target"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                )}
              </div>

              {/* Project Image Column (non-clickable) */}
              <div className="bc-project-image-wrap">
                <div className="bc-project-image-inner">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="bc-project-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Project
