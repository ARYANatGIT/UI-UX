import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, ArrowUpRight } from 'lucide-react';
import './Header.css';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container header-inner">
        {/* Brand Logo & Wordmark */}
        <Link to="/" className="brand-logo" aria-label="Raahi Home — Discover India Differently">
          <div className="brand-symbol" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="#173F35" />
              <circle cx="20" cy="20" r="14" stroke="#E9DFCE" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              <polygon points="20,6 23,18 20,20 17,18" fill="#C66D4B" />
              <polygon points="20,34 23,22 20,20 17,22" fill="#F8F5ED" />
              <polygon points="34,20 22,23 20,20 22,17" fill="#F8F5ED" />
              <polygon points="6,20 18,23 20,20 18,17" fill="#F8F5ED" />
              <circle cx="20" cy="20" r="3" fill="#173F35" stroke="#F8F5ED" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">RAAHI</span>
            <span className="brand-tagline">DISCOVER INDIA DIFFERENTLY</span>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/explore" 
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
              >
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/guides" 
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
              >
                Travel Guides
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/plan" 
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
              >
                Plan a Trip
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Primary Desktop Action */}
        <div className="header-actions">
          <Link to="/explore" className="btn btn-primary btn-sm header-cta">
            <span>Explore Destinations</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div 
        id="mobile-navigation"
        className={`mobile-drawer ${mobileMenuOpen ? 'mobile-drawer--open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-content">
          <nav aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              <li>
                <NavLink 
                  to="/" 
                  end 
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link--active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Home</span>
                  <span className="mobile-nav-hint">Landing & Featured</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/explore" 
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link--active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Explore India</span>
                  <span className="mobile-nav-hint">Filters, Regions & Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/guides" 
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link--active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Travel Guides</span>
                  <span className="mobile-nav-hint">The Raahi Journal</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/plan" 
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link--active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Plan Your Trip</span>
                  <span className="mobile-nav-hint">Interactive Itinerary Tool</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="mobile-drawer-footer">
            <Link 
              to="/plan" 
              className="btn btn-terracotta btn-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Compass size={18} aria-hidden="true" />
              <span>Start Planning Itinerary</span>
            </Link>
            <p className="mobile-brand-note">
              Curated for thoughtful, culturally rooted exploration of India.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

