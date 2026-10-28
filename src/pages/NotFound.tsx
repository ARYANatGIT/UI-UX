import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Search, Home, ArrowRight, MapPin } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import './NotFound.css';

export const NotFound: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <>
      <SEOHead
        title="Page Not Found (404) | Raahi — Discover India Differently"
        description="The travel route or guide you are looking for cannot be found. Return to our homepage or explore our curated destination catalog."
        canonicalPath="/404"
      />

      <main id="main-content" className="not-found-page">
        <div className="container not-found-content">
          <div className="not-found-compass-wrap" aria-hidden="true">
            <Compass size={64} className="not-found-compass" />
          </div>

          <span className="not-found-status-code">404 • ROUTE UNCHARTED</span>

          <h1 className="not-found-title">
            You’ve wandered off the map.
          </h1>

          <p className="not-found-desc">
            The page, trail, or guide you are looking for has either shifted or does not exist. Let's find your way back to known paths.
          </p>

          {/* Search Help */}
          <form onSubmit={handleSearch} className="not-found-search-form" role="search">
            <Search size={18} className="not-found-search-icon" aria-hidden="true" />
            <input
              type="search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search destinations (e.g. Jaipur, Kerala)..."
              className="not-found-search-input"
              aria-label="Search destinations from 404 page"
            />
            <button type="submit" className="btn btn-terracotta btn-sm">
              Search
            </button>
          </form>

          {/* Helpful Navigation Links */}
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <Home size={16} aria-hidden="true" />
              <span>Return Home</span>
            </Link>
            <Link to="/explore" className="btn btn-secondary">
              <MapPin size={16} aria-hidden="true" />
              <span>Browse All Destinations</span>
            </Link>
            <Link to="/guides" className="btn btn-ghost">
              <span>Read Travel Journal</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

