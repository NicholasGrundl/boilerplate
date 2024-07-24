import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.scss';


const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  {
    name: 'Projects',
    dropdownItems: [
      { 
        name: 'Summarize Studio', 
        path: '/summarize-studio',
        icon: 'faComment'  
      },
      { 
        name: 'Data Studio', 
        path: '/data-studio',
        icon: 'faChartLine'  
      },
    ]
  },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDropdownClick = (index) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  const handleDropdownHover = (index) => {
    if (!isMobile) {
      setActiveDropdown(index);
    }
  };

  const handleDropdownLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const renderNavItem = (item, index) => {
    if (item.dropdownItems) {
      return (
        <li key={index} 
            className={styles.navItem}
            onMouseEnter={() => handleDropdownHover(index)}
            onMouseLeave={handleDropdownLeave}
        >
          <div 
            className={`${styles.navLinks} ${styles.dropdownToggle}`} 
            onClick={() => handleDropdownClick(index)}
          >
            {item.name}
            <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon} />
          </div>
          <ul className={`${styles.dropdownMenu} ${activeDropdown === index ? styles.active : ''}`}>
            {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
              <li key={dropdownIndex}>
                <Link 
                  to={dropdownItem.path} 
                  className={styles.dropdownLink} 
                  onClick={toggleMenu}
                >
                  {dropdownItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={index} className={styles.navItem}>
        <Link 
          to={item.path} 
          className={styles.navLinks} 
          onClick={toggleMenu}
        >
          {item.name}
        </Link>
      </li>
    );
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.navbarLogo}>
          InSilico Strategy
        </Link>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>
        <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          {navItems.map(renderNavItem)}
          <li className={styles.navItem}>
            <button className={styles.loginButton}>Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;