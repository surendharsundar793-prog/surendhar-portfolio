import coding from '../assets/linkly.webp'
import tech from '../assets/emp.webp'
import cicd from '../assets/cicd.webp'
import bluegreen from '../assets/bluegreen.webp'

export const projectsData = [
  {
    id: 1,
    img: coding,
    title: "Linkly URL Shortener & Analytics",
    category: "Java Full-Stack",
    tags: ["Java 21", "Spring Boot 3", "React 19", "PostgreSQL", "JWT"],
    shortDesc: "A secure URL Shortener platform enabling users to create, manage, and track shortened URLs with analytics.",
    github: "https://github.com/surendharsundar793-prog/-Linkly-Full-Stack-URL-Shortener-Analytics-Platform",
  },
  {
    id: 2,
    img: tech,
    title: "Employee Management System",
    category: "Java Full-Stack & DevSecOps",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "Jenkins"],
    shortDesc: "Enterprise employee directory platform backed by a multi-stage DevSecOps pipeline with SonarQube and Trivy.",
    github: "https://github.com/surendharsundar793-prog/Employee-management-system",
  },
  {
    id: 3,
    img: cicd,
    title: "DevSecOps Observability & Pipeline",
    category: "Cloud & DevOps",
    tags: ["Jenkins", "Docker", "AWS EC2", "Spring Security", "GitHub Webhooks"],
    shortDesc: "Automated Jenkins CI/CD pipeline on AWS with shift-left security scanning and live monitoring.",
    github: "https://github.com/surendharsundar793-prog/Boardgame",
  },
  {
    id: 4,
    img: bluegreen,
    title: "Zero-Downtime Blue-Green Deployment",
    category: "Cloud & DevOps",
    tags: ["Kubernetes", "AWS EKS", "Jenkins", "Docker", "Docker Hub"],
    shortDesc: "Automated zero-downtime deployment pipeline on AWS EKS using Jenkins CI/CD, dynamically routing live traffic between Blue and Green environments.",
    github: "https://github.com/surendharsundar793-prog/blue-green-app",
  }
];
