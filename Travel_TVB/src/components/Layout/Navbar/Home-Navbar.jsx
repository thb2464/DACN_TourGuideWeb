import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext'; // Make sure this path is correct
import './Home-Navbar.css';
import config from '../../../config/strapi';

const Home_Navbar = () => {
  // 1. Get language state and functions from the context
  const { languages, currentLanguage, handleLanguageSelect } = useLanguage();

  const [navbarData, setNavbarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Local UI state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // 2. Fetch navbar data whenever the currentLanguage changes
  useEffect(() => {
    const fetchNavbarData = async () => {
      // Set loading to true on each fetch (for language changes)
      setLoading(true);
      setError(null);

      try {
        const populateQuery = 'populate[Navbar_logo]=true&populate[navigationButtons]=true&populate[Nav_button]=true';
        // 3. Add the 'locale' parameter to the API request
        const apiUrl = `${config.STRAPI_URL}${config.API_ENDPOINTS.LAYOUT_NAVBAR}?${populateQuery}&locale=${currentLanguage.code}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const json = await response.json();
        const data = json.data;

        if (!data) {
          throw new Error('No navbar data found for the selected language.');
        }

        // Transform Strapi data to match component's expected structure
        const transformedData = {
          logo: {
            src: data.Navbar_logo ? `${config.STRAPI_URL}${data.Navbar_logo.url}` : '',
            alt: data.Navbar_logo ? (data.Navbar_logo.alternativeText || 'Logo') : 'Logo',
            href: '/'
          },
          navigation: data.navigationButtons?.map(button => ({
            text: button.navigationText || '',
            path: button.path || '/'
          })) || [],
          navctaButton: {
            text: data.Nav_button?.Text || 'Contact',
            path: data.Nav_button?.Url || '/contact'
          }
        };

        setNavbarData(transformedData);
      } catch (err) {
        console.error("Failed to fetch navbar data:", err);
        setError(`Could not load content for ${currentLanguage.name}.`);
        
        // Fallback to default data (you might want to internationalize this too eventually)
        setNavbarData({
          logo: { src: '/logo.svg', alt: 'Logo', href: '/' },
          navigation: [
            { text: 'Home', path: '/' },
            { text: 'About', path: '/' },
            { text: 'Services', path: '/' },
            { text: 'News', path: '/' },
            { text: 'Community', path: '/' }
          ],
          navctaButton: { text: 'Contact Us', path: '/contact' }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarData();
  }, [currentLanguage]); // Dependency: re-run this effect when currentLanguage changes

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const threshold = window.innerHeight * 0.1;
      setIsScrolled(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle click outside to close dropdowns and mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-selector') && !event.target.closest('.sticky-language-selector')) {
        setIsLanguageDropdownOpen(false);
      }
      if (!event.target.closest('.mobile-menu') && !event.target.closest('.burger-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  // Custom language select handler to also close the dropdown
  const onLanguageSelect = (language) => {
    handleLanguageSelect(language); // Call the context's handler
    setIsLanguageDropdownOpen(false); // Close the dropdown
  };

  if (loading) {
    return (
      <nav className="navbar navbar-loading">
        <div className="navbar-container">
          <div>Loading...</div>
        </div>
      </nav>
    );
  }

  // Still render with fallback data on error
  if (error) {
    console.warn("Navbar error:", error);
  }

  if (!navbarData) {
    return null; // Or some other fallback UI
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isHomePage ? 'navbar-home' : 'navbar-other'}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to={navbarData.logo.href} className="navbar-logo">
            <img src={navbarData.logo.src} alt={navbarData.logo.alt} className="logo-image" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar-nav">
            {navbarData.navigation.map((item, index) => (
              <Link key={index} to={item.path} className="nav-link">
                {item.text}
              </Link>
            ))}
          </div>

          {/* Right Side: CTA Button, Language Selector, and Burger Menu */}
          <div className="navbar-right">
            {/* CTA Button */}
            <Link to={navbarData.navctaButton.path} className="nav-cta-button">
              {navbarData.navctaButton.text}
              <span className="nav-cta-arrow">→</span>
            </Link>

            {/* Desktop Language Selector */}
            <div className="language-selector desktop-only">
              <button
                className="language-toggle"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                aria-label="Select language"
              >
                🌐
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="language-dropdown">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`language-option ${currentLanguage.code === language.code ? 'active' : ''}`}
                      onClick={() => onLanguageSelect(language)} // Use the new handler
                    >
                      <span className="language-flag">{language.flag}</span>
                      <span className="language-name">{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Burger Menu Button */}
            <button
              className="burger-menu mobile-only"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <div className={`burger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
              <div className={`burger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
              <div className={`burger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-nav-links">
            {navbarData.navigation.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="mobile-nav-link"
                onClick={handleNavLinkClick}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Sticky Language Selector for Mobile */}
      <div className="sticky-language-selector mobile-only">
        <button
          className="sticky-language-toggle"
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          aria-label="Select language"
        >
          <span className="current-language-flag">{currentLanguage.flag}</span>
        </button>
        
        {isLanguageDropdownOpen && (
          <div className="sticky-language-dropdown">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`language-option ${currentLanguage.code === language.code ? 'active' : ''}`}
                onClick={() => onLanguageSelect(language)} // Use the new handler
              >
                <span className="language-flag">{language.flag}</span>
                <span className="language-name">{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home_Navbar;