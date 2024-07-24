import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Services.module.scss';

const Services = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const renderPlaceholderSVG = (color) => (
    <svg width="200" height="200" viewBox="0 0 200 200" className={styles.placeholderSVG}>
      <rect width="200" height="200" fill={color} />
      <text x="100" y="100" fontFamily="Arial" fontSize="16" fill="white" textAnchor="middle" dominantBaseline="middle">
        Placeholder SVG
      </text>
    </svg>
  );

  return (
    <div className={styles.servicesPage}>
      <h1>Our Services</h1>
      
      <section id="techno-economic-analysis" className={styles.serviceSection}>
        <h2>Techno-Economic Analysis</h2>
        {renderPlaceholderSVG("#4a00e0")}
        <p>Our Techno-Economic Analysis service leverages cutting-edge AI and machine learning algorithms to provide in-depth insights into the economic viability of emerging technologies. We analyze factors such as:</p>
        <ul>
          <li>Technology readiness levels</li>
          <li>Market potential and growth projections</li>
          <li>Production costs and scalability</li>
          <li>Regulatory landscapes and compliance requirements</li>
        </ul>
        <p>By combining these factors, we deliver comprehensive reports that enable informed decision-making for investments, R&D directions, and strategic planning.</p>
        <div className={styles.placeholder}>
          <h3>Sample Analysis Output</h3>
          <div className={styles.chart}></div>
        </div>
      </section>

      <section id="strategic-consulting" className={styles.serviceSection}>
        <h2>Strategic Consulting</h2>
        {renderPlaceholderSVG("#00a86b")}
        <p>Our Strategic Consulting services provide expert guidance to navigate the complex landscape of emerging technologies. We offer:</p>
        <ul>
          <li>Technology trend analysis and forecasting</li>
          <li>Competitive landscape assessment</li>
          <li>Innovation roadmap development</li>
          <li>Risk assessment and mitigation strategies</li>
        </ul>
        <p>Our team of seasoned consultants brings decades of combined experience across various tech sectors, ensuring that our clients stay ahead of the curve in rapidly evolving markets.</p>
        <div className={styles.placeholder}>
          <h3>Strategic Framework</h3>
          <div className={styles.diagram}></div>
        </div>
        <p>We tailor our approach to each client's unique needs, delivering actionable insights that drive growth and innovation.</p>
      </section>

      <section id="data-driven-insights" className={styles.serviceSection}>
        <h2>Data-Driven Insights</h2>
        {renderPlaceholderSVG("#ffa500")}
        <p>Our Data-Driven Insights service harnesses the power of big data analytics to uncover hidden patterns, optimize processes, and drive innovation. We specialize in:</p>
        <ul>
          <li>Predictive analytics and forecasting</li>
          <li>Machine learning model development</li>
          <li>Data visualization and dashboard creation</li>
          <li>Natural language processing for unstructured data analysis</li>
        </ul>
        <p>By leveraging advanced algorithms and cloud computing, we transform raw data into actionable intelligence, enabling our clients to make data-driven decisions with confidence.</p>
        <div className={styles.placeholder}>
          <h3>Data Processing Pipeline</h3>
          <div className={styles.pipeline}></div>
        </div>
        <p>Our insights have helped clients across various industries achieve significant improvements in efficiency, customer satisfaction, and revenue growth.</p>
      </section>
    </div>
  );
};

export default Services;