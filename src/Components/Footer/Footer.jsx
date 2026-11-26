import React from 'react';
import '../../assets/Styles/footer.css';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="minimal-footer">
      {/* Left Fixed Social Rail */}
      <div className="bc-side-rail bc-side-left" aria-label="Social links">
        <ul className="bc-social-list">
          <li>
            <a
              href="https://github.com/surendharsundar793-prog"
              className="cursor-target"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub Profile"
            >
              <Github size={19} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/surendhar-s-8a40b6312/"
              className="cursor-target"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn Profile"
            >
              <Linkedin size={19} />
            </a>
          </li>
        </ul>
        <div className="bc-rail-line" />
      </div>

      {/* Right Fixed Email Rail */}
      <div className="bc-side-rail bc-side-right" aria-label="Email link">
        <a
          href="mailto:surendharsundar793@gmail.com"
          className="bc-vertical-email cursor-target"
          title="surendharsundar793@gmail.com"
        >
          surendharsundar793@gmail.com
        </a>
        <div className="bc-rail-line" />
      </div>

      {/* Centered Footer Credit */}
      <div className="footer-content">
        <div className="footer-credits">
          <div className="footer-social-row">
            <a
              href="https://github.com/surendharsundar793-prog"
              className="cursor-target"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/surendhar-s-8a40b6312/"
              className="cursor-target"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
          </div>
          <a
            href="https://github.com/surendharsundar793-prog"
            target="_blank"
            rel="noopener noreferrer"
            className="coded-by cursor-target"
          >
            Designed &amp; Built by Surendhar S
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
