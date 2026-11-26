import React, { useEffect, lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import Home from './Components/Home'
import Navbar from './Components/Navbar/Navbar'
import ClickSpark from './Components/ClickSpark'

const About = lazy(() => import('./Components/About'))
const Skills = lazy(() => import('./Components/Skills'))
const Project = lazy(() => import('./Components/Project'))
const Contact = lazy(() => import('./Components/Contact'))
const Footer = lazy(() => import('./Components/Footer/Footer'))
const Particles = lazy(() => import('./Components/Particles'))

import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scrolls to section matching URL hash — compatible with Lenis
function ScrollToSection() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        setTimeout(() => {
          const offset = 60
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -offset })
          } else {
            const top = el.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
          }
          history.replaceState(null, '', location.pathname)
        }, 150)
      }
    }
  }, [location])

  return null
}

// Updates browser tab title as user scrolls between sections
const sectionTitles = {
  home:    'Surendhar',
  project: 'Surendhar | Projects',
  skills:  'Surendhar | Skills',
  about:   'Surendhar | About',
  contact: 'Surendhar | Contact',
}

function SectionTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.title = sectionTitles[id] || 'Surendhar - Portfolio';
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Dark mode only enforcement
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  useEffect(() => {
    // Always start at top on load/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // Lenis smooth scroll for natural page flow
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothTouch: true
    })
    window.lenis = lenis

    lenis.scrollTo(0, { immediate: true })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      window.lenis = null
      gsap.ticker.remove(raf)
    }
  }, [])

  return (
    <ClickSpark
      sparkColor={['#5B7564', '#7EA38B', '#F9F6F1', '#E8C547']}
      sparkSize={12}
      sparkRadius={26}
      sparkCount={8}
      duration={450}
    >
      {/* React Bits Particles Background - Active in Dark Mode Only */}
      <div className="dark-particles-wrapper" aria-hidden="true">
        <Suspense fallback={null}>
          <Particles
            particleCount={120}
            particleSpread={10}
            speed={0.12}
            particleColors={['#F9F6F1', '#7EA38B', '#5B7564', '#E8C547']}
            moveParticlesOnHover={true}
            particleHoverFactor={0.8}
            alphaParticles={true}
            particleBaseSize={85}
            sizeRandomness={1.1}
            cameraDistance={20}
            glow={0.6}
            twinkle={0.4}
            clickBurst={false}
            opacity={0.85}
            paused={false}
          />
        </Suspense>
      </div>

      <ScrollToSection />
      <SectionTitleUpdater />
      <Routes>
        <Route path="/" element={
          <div className="port">
            <Navbar />
            <section id="home" className="portfolio-section">
              <Home />
            </section>
            <Suspense fallback={null}>
              <section id="about" className="portfolio-section">
                <About />
              </section>
              <section id="skills" className="portfolio-section">
                <Skills />
              </section>
              <section id="project" className="portfolio-section">
                <Project />
              </section>
              <section id="contact" className="portfolio-section">
                <Contact />
              </section>
              <Footer />
            </Suspense>
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ClickSpark>
  )
}

export default App
