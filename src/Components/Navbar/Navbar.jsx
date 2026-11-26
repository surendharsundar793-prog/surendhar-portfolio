import React, { useState, useEffect } from 'react';
import '../../assets/Styles/navbar.css';
import resumePdf from '../../assets/surendhar-resume.pdf';

const navLinks = [
  { num: '01.', name: 'About', id: '#about' },
  { num: '02.', name: 'Skills', id: '#skills' },
  { num: '03.', name: 'Projects', id: '#project' },
  { num: '04.', name: 'Contact', id: '#contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 30);

      if (currentY > 100 && currentY > lastScrollY && !menuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);

    if (id === '#home') {
      if (window.lenis) {
        window.lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

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
    <>
      <header className={`bc-navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
        <nav className="bc-nav-inner" aria-label="Primary Navigation">
          {/* Hexagonal 'S' Monogram Logo */}
          <a
            href="#home"
            className="bc-logo cursor-target"
            onClick={(e) => scrollToSection(e, '#home')}
            aria-label="Home"
          >
            <svg width="38" height="38" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <polygon
                points="50,5 93,28 93,72 50,95 7,72 7,28"
                stroke="currentColor"
                strokeWidth="5"
                fill="rgba(126, 163, 139, 0.06)"
              />
              <text
                x="50"
                y="62"
                textAnchor="middle"
                fill="currentColor"
                fontSize="42"
                fontWeight="700"
                fontFamily="Roboto Mono, monospace"
              >
                S
              </text>
            </svg>
          </a>

          {/* Desktop Links */}
          <div className="bc-nav-links">
            <ol className="bc-nav-list">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.id}
                    className="bc-nav-link cursor-target"
                    onClick={(e) => scrollToSection(e, item.id)}
                  >
                    <span className="bc-nav-num">{item.num}</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ol>

            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="bc-resume-btn cursor-target"
            >
              Resume
            </a>
          </div>

          {/* Mobile Asymmetric Hamburger Button */}
          <button
            className={`bc-hamburger-btn cursor-target ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span className="bc-ham-box">
              <span className="bc-ham-inner" />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile Blurred Backdrop */}
      <div
        className={`bc-mobile-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Right Slide-In Drawer */}
      <aside
        className={`bc-mobile-aside ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="bc-mobile-aside-nav">
          <ol className="bc-mobile-list">
            {navLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={item.id}
                  className="bc-mobile-link"
                  onClick={(e) => scrollToSection(e, item.id)}
                >
                  <span className="bc-mobile-num">{item.num}</span>
                  <span className="bc-mobile-label">{item.name}</span>
                </a>
              </li>
            ))}
          </ol>

          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="bc-resume-btn bc-mobile-resume"
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
