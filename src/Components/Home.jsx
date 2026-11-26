import React from 'react'
import '../assets/Styles/home.css'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import RisingInk from './RisingInk'

const Home = () => {
  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -70 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="home-hero-section">
      <div className="home-hero-container">
        <motion.div
          className="home-hero-text"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="home-overline">Hi, my name is</p>

          <h1 className="home-hero-name">
            <RisingInk
              text="Surendhar S"
              as="span"
              color="#FFFFFF"
              near="#B19EEF"
              far="#3A1DB8"
              plates={7}
              lift={0.50}
              radius={1.40}
              angle={35}
              stiffness={1.00}
              damping={0.50}
              pop={1.00}
              shadow={0.60}
              intro={true}
              className="rising-ink-name"
            />
          </h1>

          <h2 className="home-hero-subheadline">
            I build things for the cloud &amp; web
          </h2>

          <p className="home-hero-bio">
            I’m an engineering graduate specializing in DevOps, Cloud Infrastructure, and Java Full-Stack development—focused on automating CI/CD pipelines, containerizing resilient deployments, and building scalable <span className="home-bio-accent">AWS &amp; Spring Boot</span> applications.
          </p>

          <div className="home-hero-actions">
            <button
              className="home-btn-outline cursor-target"
              onClick={() => handleScrollTo('#project')}
            >
              <span>Check out my work</span>
              <ArrowRight size={16} className="btn-arrow-icon" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
