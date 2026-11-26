import React, { useState } from 'react';
import '../assets/Styles/skills.css';
import { motion } from 'framer-motion';

import {
  SiReact,
  SiJavascript,
  SiVite,
  SiSpringboot,
  SiHibernate,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,
  SiTerraform,
  SiAnsible,
  SiPrometheus,
  SiGrafana,
  SiLinux,
  SiGit,
  SiApachemaven,
  SiPostman
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa6';
import { TbApi } from 'react-icons/tb';

const skillDomains = [
  {
    id: 'cloud',
    tab: 'Cloud & DevOps',
    title: 'Cloud Infrastructure & CI/CD Automation',
    meta: 'AWS · Kubernetes · Terraform · Jenkins',
    bullets: [
      'Provisioned highly available AWS environments across EC2, EKS, VPC, S3, IAM, ALB, and Auto Scaling Groups.',
      'Automated end-to-end build, test, and deployment workflows using Jenkins declarative pipelines and GitHub Actions.',
      'Containerized multi-service applications with multi-stage Dockerfiles and orchestrated zero-downtime Blue-Green releases on Kubernetes.',
      'Managed Infrastructure as Code and configuration automation with Terraform, Ansible, and Linux/Bash scripting.'
    ],
    badges: [
      { name: 'AWS', color: '#FF9900', icon: <FaAws size={18} /> },
      { name: 'Docker', color: '#2496ED', icon: <SiDocker size={18} /> },
      { name: 'Kubernetes', color: '#326CE5', icon: <SiKubernetes size={18} /> },
      { name: 'Jenkins', color: '#D24939', icon: <SiJenkins size={18} /> },
      { name: 'GitHub Actions', color: '#2088FF', icon: <SiGithubactions size={18} /> },
      { name: 'Terraform', color: '#844FBA', icon: <SiTerraform size={18} /> },
      { name: 'Ansible', color: '#EE0000', icon: <SiAnsible size={18} /> },
      { name: 'Linux', color: '#D99B00', icon: <SiLinux size={18} /> }
    ]
  },
  {
    id: 'fullstack',
    tab: 'Java & Full-Stack',
    title: 'Backend Architecture & Modern Web Apps',
    meta: 'Java · Spring Boot · React.js · PostgreSQL',
    bullets: [
      'Engineered modular RESTful APIs in Java & Spring Boot with clean layered architecture and Hibernate / Spring Data JPA.',
      'Implemented stateless JWT authentication, Spring Security authorization, and Gmail SMTP email verification/recovery flows.',
      'Built responsive React.js + Vite frontends with protected routes, analytics dashboards, and state-driven CRUD interfaces.',
      'Modeled relational schemas and optimized queries across PostgreSQL and Oracle SQL, verified via Postman & Maven.'
    ],
    badges: [
      { name: 'Java', color: '#E76F00', icon: <FaJava size={18} /> },
      { name: 'Spring Boot', color: '#6DB33F', icon: <SiSpringboot size={18} /> },
      { name: 'Hibernate', color: '#59666C', icon: <SiHibernate size={18} /> },
      { name: 'REST API', color: '#0284C7', icon: <TbApi size={18} /> },
      { name: 'React', color: '#087EA4', icon: <SiReact size={18} /> },
      { name: 'JavaScript', color: '#E5A00D', icon: <SiJavascript size={18} /> },
      { name: 'Vite', color: '#646CFF', icon: <SiVite size={18} /> },
      { name: 'PostgreSQL', color: '#336791', icon: <SiPostgresql size={18} /> },
      { name: 'Maven', color: '#C71A36', icon: <SiApachemaven size={18} /> },
      { name: 'Postman', color: '#FF6C37', icon: <SiPostman size={18} /> }
    ]
  },
  {
    id: 'secops',
    tab: 'SecOps & Monitoring',
    title: 'Shift-Left Security & Real-Time Observability',
    meta: 'SonarQube · Trivy · Nexus · Prometheus · Grafana',
    bullets: [
      'Integrated SonarQube static code quality gates and Trivy container vulnerability scans directly into Jenkins pipelines.',
      'Versioned and promoted immutable Docker images and Maven build artifacts through Nexus Repository & Docker Hub.',
      'Configured Prometheus metric scraping and Grafana dashboards for real-time cluster health, pod telemetry, and latency tracking.',
      'Maintained clean Git branching, GitHub webhooks, and automated rollback readiness for production workloads.'
    ],
    badges: [
      { name: 'Prometheus', color: '#E6522C', icon: <SiPrometheus size={18} /> },
      { name: 'Grafana', color: '#F46800', icon: <SiGrafana size={18} /> },
      { name: 'Git', color: '#F05032', icon: <SiGit size={18} /> },
      { name: 'Docker', color: '#2496ED', icon: <SiDocker size={18} /> },
      { name: 'Kubernetes', color: '#326CE5', icon: <SiKubernetes size={18} /> }
    ]
  },
  {
    id: 'ai',
    tab: 'AI & Training',
    title: 'AI-Assisted Engineering & Academic Foundation',
    meta: 'B.E. ECE (2025) · JSpiders Bengaluru · AI Workflows',
    bullets: [
      'AI Exposure: Applying AI coding assistants, prompt engineering, and agentic workflows to speed up Spring Boot/React prototyping, debug CI/CD failures, and draft Terraform/Kubernetes manifests.',
      'Certification: Java Full-Stack Development with DevOps Training — JSpiders Training & Development Center, Bengaluru.',
      'Education: Bachelor of Engineering in Electronics & Communication Engineering (Nov 2021 – May 2025), Adhiyamaan College of Engineering, Hosur.'
    ],
    badges: []
  }
];

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = skillDomains[activeIndex];

  return (
    <div className="skills-section">
      <div className="skills-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="bc-section-heading">
            <span className="bc-section-num">02.</span>
            <span>Skills &amp; Training</span>
          </h2>

          <div className="bc-tabs-layout">
            {/* Left Tab Rail */}
            <div className="bc-tab-list" role="tablist" aria-label="Skill domains">
              {skillDomains.map((domain, idx) => (
                <button
                  key={domain.id}
                  role="tab"
                  aria-selected={activeIndex === idx}
                  className={`bc-tab-btn cursor-target ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {domain.tab}
                </button>
              ))}
            </div>

            {/* Right Tab Panel */}
            <div className="bc-tab-panel" role="tabpanel">
              <h3 className="bc-panel-title">{current.title}</h3>
              <p className="bc-panel-meta">{current.meta}</p>

              <ul className="bc-panel-bullets">
                {current.bullets.map((bullet, i) => (
                  <li key={i}>
                    <span className="bc-bullet" aria-hidden="true">▹</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {current.badges.length > 0 && (
                <div className="bc-panel-badges">
                  {current.badges.map((b) => (
                    <span key={b.name} className="bc-tech-pill">
                      <span style={{ color: b.color, display: 'inline-flex' }}>{b.icon}</span>
                      <span>{b.name}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
