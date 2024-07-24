import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/layout/HeroSection/HeroSection';
import CustomCard from '../components/CustomCard/CustomCard';
import { services } from '../services/services';
import styles from './MainLanding.module.scss';

/**
 * MainLanding component represents the main landing page of the application.
 * It displays a hero section, a list of services, and a call-to-action section.
 *
 * @component
 * @example
 * return (
 *   <MainLanding />
 * )
 */
const MainLanding = () => {
  return (
    <div className={styles.mainLanding}>
      <HeroSection />
      
      <section className={styles.services}>
        <h2>Our Services</h2>
        <div className={styles.serviceGrid}>
          {services.map(service => (
            <CustomCard 
              key={service.id}
              title={service.title}
              description={service.description}
              media={service.media}
              linkTo={service.linkTo}
            />
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to Transform Your Business?</h2>
        <p>Discover how InSilico Strategy can help you navigate the future of technology and economics.</p>
        <Link to="/contact" className={styles.ctaButton}>Get Started</Link>
      </section>
    </div>
  );
};

export default MainLanding;