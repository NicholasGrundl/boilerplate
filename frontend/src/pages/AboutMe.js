import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutMe.module.scss';

const AboutMe = () => {
  return (
    <div className={styles.aboutMeContainer}>
      <header className={styles.aboutMeHeader}>
        <h1>Pioneering the Future of Techno-Economic Analysis</h1>
      </header>

      <section className={styles.aboutMeIntro}>
        <p>
          Welcome to InSilico Strategy, where we leverage cutting-edge AI and 
          data analytics to revolutionize techno-economic analysis. Our mission 
          is to empower businesses with insights that drive innovation and 
          sustainable growth in the rapidly evolving technological landscape.
        </p>
      </section>

      <section className={styles.expertiseAreas}>
        <h2>Our Expertise</h2>
        <div className={styles.expertiseGrid}>
          <div className={styles.expertiseItem}>
            <i className="icon-ai"></i>
            <h3>AI Integration</h3>
            <p>Harnessing the power of artificial intelligence for predictive analytics</p>
          </div>
          <div className={styles.expertiseItem}>
            <i className="icon-analysis"></i>
            <h3>Techno-Economic Analysis</h3>
            <p>Comprehensive evaluation of technological systems and their economic impact</p>
          </div>
          <div className={styles.expertiseItem}>
            <i className="icon-strategy"></i>
            <h3>Strategic Consulting</h3>
            <p>Guiding businesses through technological transformations</p>
          </div>
        </div>
      </section>

      <section className={styles.aboutMeBackground}>
        <h2>Our Story</h2>
        <p>
          Founded in 2024, InSilico Strategy emerged from a vision to bridge the 
          gap between technological advancement and economic feasibility. Our 
          team of experts combines decades of experience in data science, 
          economics, and industry analysis to provide unparalleled insights to 
          our clients.
        </p>
      </section>

      <section className={styles.callToAction}>
        <h2>Ready to Transform Your Business?</h2>
        <p>
          Discover how InSilico Strategy can help you navigate the complex 
          intersection of technology and economics.
        </p>
        <Link to="/contact" className={styles.ctaButton}>Get in Touch</Link>
      </section>
    </div>
  );
};

export default AboutMe;