import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, MapPin, Sparkles, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        {/* Top Section: Brand & Academic Context */}
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-brand" aria-label="Raahi Homepage">
              <div className="footer-symbol" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="#F8F5ED" />
                  <polygon points="20,6 23,18 20,20 17,18" fill="#C66D4B" />
                  <polygon points="20,34 23,22 20,20 17,22" fill="#173F35" />
                  <polygon points="34,20 22,23 20,20 22,17" fill="#173F35" />
                  <polygon points="6,20 18,23 20,20 18,17" fill="#173F35" />
                  <circle cx="20" cy="20" r="3" fill="#F8F5ED" stroke="#173F35" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <span className="footer-brand-name">RAAHI</span>
                <span className="footer-brand-sub">DISCOVER INDIA DIFFERENTLY</span>
              </div>
            </Link>
            <p className="footer-desc">
              An editorial travel discovery and itinerary planning platform dedicated to mindful exploration of India's cultural heritage, diverse landscapes, and living traditions.
            </p>
            <div className="footer-brand-badge">
              <span className="badge-tag">Mindful Travel</span>
              <p>Independent Discovery & Field Exploration</p>
              <p className="footer-badge-sub">Connecting travelers with authentic cultural lineages across India.</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/explore">Explore Destinations</Link></li>
              <li><Link to="/guides">The Travel Journal</Link></li>
              <li><Link to="/plan">Itinerary Planner</Link></li>
            </ul>
          </div>

          {/* Column 3: Featured Guides */}
          <div className="footer-col">
            <h3 className="footer-heading">In-Depth Guides</h3>
            <ul className="footer-links">
              <li><Link to="/guides/three-days-in-jaipur">3 Days in Jaipur (Rajasthan)</Link></li>
              <li><Link to="/guides/munnar-travel-guide">Slow Guide to Munnar (Kerala)</Link></li>
              <li><Link to="/guides/weekend-in-rishikesh">Mindful Rishikesh Weekend</Link></li>
              <li><Link to="/explore?category=Culture+%26+Heritage">Culture & Heritage Circuit</Link></li>
            </ul>
          </div>

          {/* Column 4: Ethical Exploration */}
          <div className="footer-col">
            <h3 className="footer-heading">Ethical Exploration</h3>
            <p className="footer-ethics-text">
              Raahi encourages responsible travel: leaving no trace in mountain wildernesses, dressing respectfully at sacred sites, and supporting generational artisan guilds directly.
            </p>
            <div className="footer-disclaimer">
              <p><strong>Notice:</strong> All costs, transit suggestions, and durations presented are indicative planning estimates. Check local operators for real-time rates.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} RAAHI. All rights reserved.
          </p>
          <div className="footer-meta-links">
            <span className="footer-tagline-quote">"Discover India Differently."</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

