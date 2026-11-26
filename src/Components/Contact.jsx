import React from 'react'
import '../assets/Styles/contact.css'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'

const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-container">
        <motion.div
          className="bc-contact-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="bc-contact-overline">
            <span className="bc-section-num">04.</span> What’s Next?
          </p>

          <h2 className="bc-contact-title">Get In Touch</h2>

          <p className="bc-contact-desc">
            I’m currently open to <strong>entry-level</strong> opportunities. Whether you have a role, a project idea, or just want to connect, my inbox is always open.
          </p>

          <div className="bc-contact-actions">
            <a
              href="mailto:surendharsundar793@gmail.com"
              className="home-btn-outline cursor-target"
              title="surendharsundar793@gmail.com"
            >
              <Mail size={16} />
              <span>Say Hello</span>
            </a>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default Contact
