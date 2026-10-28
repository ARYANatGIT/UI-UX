import React, { useState, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ArrowRight, Compass, MapPin, Sparkles, 
  Mountain, Landmark, Waves, Trees, Coffee, Footprints, 
  Calendar, CheckCircle, ShieldCheck
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { DestinationCard } from '../components/DestinationCard';
import { GuideCard } from '../components/GuideCard';
import { DESTINATIONS, Destination } from '../data/destinations';
import { GUIDE_ARTICLES } from '../data/guides';
import './Home.css';

interface HomeProps {
  onAddToPlanner?: (dest: Destination) => void;
  plannerDestinationIds?: string[];
}

export const Home: React.FC<HomeProps> = ({ 
  onAddToPlanner, 
  plannerDestinationIds = [] 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchInputId = useId();

  // Curated featured destinations
  const featuredDestinations = DESTINATIONS.filter(d => 
    ['jaipur', 'munnar', 'hampi', 'rishikesh', 'meghalaya', 'goa'].includes(d.id)
  );

  // Filtered live search suggestions
  const searchSuggestions = searchQuery.trim().length > 0 
    ? DESTINATIONS.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const selectSuggestion = (dest: Destination) => {
    setSearchQuery(dest.name);
    setShowSuggestions(false);
    navigate(`/explore?q=${encodeURIComponent(dest.name)}`);
  };

  // Categories for "Travel by Mood"
  const moods = [
    {
      title: 'Mountains & Mist',
      category: 'Mountains & Mist',
      icon: Mountain,
      description: 'High Himalayan ridges, cold deserts, and tea-blanketed western slopes.',
      bgClass: 'mood-card--mountains',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Culture & Heritage',
      category: 'Culture & Heritage',
      icon: Landmark,
      description: 'Fortress citadels, UNESCO stone ruins, and centuries-old craft guilds.',
      bgClass: 'mood-card--heritage',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Beaches & Coastlines',
      category: 'Beaches & Coastlines',
      icon: Waves,
      description: 'Quiet susegad fishing hamlets, estuarine rivers, and golden palm shores.',
      bgClass: 'mood-card--coasts',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Nature & Wildlife',
      category: 'Nature & Wildlife',
      icon: Trees,
      description: 'Living root bridge valleys, endemic tahr reserves, and pristine rainforests.',
      bgClass: 'mood-card--nature',
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Slow Travel',
      category: 'Slow Travel',
      icon: Coffee,
      description: 'Organic coffee plantations, tribal homestays, and restorative pauses.',
      bgClass: 'mood-card--slow',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Weekend Escapes',
      category: 'Weekend Escapes',
      icon: Footprints,
      description: 'Quick rejuvenating 48-hour mountain and river retreats from major hubs.',
      bgClass: 'mood-card--weekend',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <>
      <SEOHead
        title="Raahi — Discover Beautiful Places to Visit in India | Travel Discovery & Planning"
        description="Discover India differently with Raahi. Explore authentic travel guides, curated destinations from Munnar to Spiti, and craft personalized journey itineraries."
        canonicalPath="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Raahi",
          "url": "https://raahi-travel-three.vercel.app/",
          "description": "Discover India differently. An editorial guide to curated destinations, authentic travel guides, and personalized journey planning.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://raahi-travel-three.vercel.app/explore?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />

      <main id="main-content" className="home-page">
        {/* HERO SECTION */}
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-background-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1920&q=85" 
              alt="Misty emerald hills and tea gardens of Munnar, Western Ghats, India" 
              className="hero-background-image"
              width={1920}
              height={1080}
              fetchPriority="high"
            />
            <div className="hero-overlay" />
          </div>

          <div className="container hero-content-container">
            <div className="hero-tag-badge">
              <Compass size={14} aria-hidden="true" />
              <span>Editorial Indian Discovery</span>
            </div>

            <h1 id="hero-heading" className="hero-headline">
              India is more than a destination. <br />
              <span className="hero-headline-highlight">It’s a feeling.</span>
            </h1>

            <p className="hero-subhead">
              Journey past commercial tourist loops. Discover high Himalayan passes, misty tea slopes in the Western Ghats, living artisan traditions, and secluded coastal havens across India.
            </p>

            {/* Integrated Search Box */}
            <div className="hero-search-wrapper">
              <form onSubmit={handleSearchSubmit} className="hero-search-form" role="search" aria-label="Search destinations in India">
                <div className="hero-search-input-box">
                  <label htmlFor={searchInputId} className="sr-only">Search destinations, states, or travel styles in India</label>
                  <Search size={20} className="hero-search-icon" aria-hidden="true" />
                  <input
                    id={searchInputId}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search Jaipur, Munnar, Spiti, beaches, or heritage..."
                    className="hero-search-input"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button 
                      type="button" 
                      onClick={() => setSearchQuery('')}
                      className="hero-search-clear"
                      aria-label="Clear search text"
                    >
                      ×
                    </button>
                  )}
                </div>
                <button type="submit" className="btn btn-terracotta hero-search-btn">
                  <span>Explore</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>

              {/* Autocomplete Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="search-suggestions-dropdown" role="listbox" aria-label="Destination suggestions">
                  {searchSuggestions.map((dest) => (
                    <button
                      key={dest.id}
                      type="button"
                      role="option"
                      aria-selected={false}
                      className="suggestion-item"
                      onClick={() => selectSuggestion(dest)}
                    >
                      <MapPin size={16} className="suggestion-icon" aria-hidden="true" />
                      <div className="suggestion-text">
                        <span className="suggestion-name">{dest.name}</span>
                        <span className="suggestion-state">{dest.state} • {dest.category}</span>
                      </div>
                      <span className="suggestion-arrow">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hero Quick CTAs */}
            <div className="hero-actions-row">
              <Link to="/explore" className="btn btn-primary">
                <span>Explore All Destinations</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/plan" className="btn btn-secondary hero-btn-secondary">
                <Calendar size={16} aria-hidden="true" />
                <span>Build Your Itinerary</span>
              </Link>
            </div>

            {/* Editorial Image Location Label */}
            <div className="hero-location-caption">
              <MapPin size={13} aria-hidden="true" />
              <span>Munnar, The Western Ghats • Elevation 1,600m</span>
            </div>
          </div>
        </section>

        {/* SECTION 1: FEATURED DESTINATIONS */}
        <section className="section-featured" aria-labelledby="featured-heading">
          <div className="container">
            <div className="section-header-row">
              <div>
                <span className="section-eyebrow">Curated Collections</span>
                <h2 id="featured-heading" className="section-title">
                  Curated Indian Destinations
                </h2>
                <p className="section-subtitle">
                  Hand-selected places celebrated for distinct cultural character, natural wonder, and authentic travel experiences.
                </p>
              </div>
              <Link to="/explore" className="view-all-link">
                <span>View all 14 destinations</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="destinations-grid">
              {featuredDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onAddToPlanner={onAddToPlanner}
                  isAddedToPlanner={plannerDestinationIds.includes(dest.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: TRAVEL BY MOOD */}
        <section className="section-moods" aria-labelledby="moods-heading">
          <div className="container">
            <div className="section-header-centered">
              <span className="section-eyebrow">Find Your Rhythm</span>
              <h2 id="moods-heading" className="section-title">
                Travel by Mood & Landscape
              </h2>
              <p className="section-subtitle">
                Whether you seek the contemplative stillness of high mountain passes or the vibrant buzz of historical bazaars.
              </p>
            </div>

            <div className="moods-grid">
              {moods.map((mood, idx) => {
                const IconComponent = mood.icon;
                return (
                  <Link
                    key={idx}
                    to={`/explore?category=${encodeURIComponent(mood.category)}`}
                    className="mood-card"
                  >
                    <div className="mood-card-image-wrap">
                      <img
                        src={mood.image}
                        alt={`${mood.title} in India`}
                        loading="lazy"
                        className="mood-card-image"
                        width={600}
                        height={400}
                      />
                      <div className="mood-card-gradient" />
                    </div>
                    <div className="mood-card-content">
                      <div className="mood-card-icon-pill">
                        <IconComponent size={20} aria-hidden="true" />
                      </div>
                      <h3 className="mood-card-title">{mood.title}</h3>
                      <p className="mood-card-desc">{mood.description}</p>
                      <span className="mood-card-link">
                        <span>Explore category</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: THE RAAHI TRAVEL JOURNAL (Stories for your next escape) */}
        <section className="section-stories" aria-labelledby="stories-heading">
          <div className="container">
            <div className="section-header-row">
              <div>
                <span className="section-eyebrow">Editorial Perspective</span>
                <h2 id="stories-heading" className="section-title">
                  Stories for Your Next Escape
                </h2>
                <p className="section-subtitle">
                  In-depth, field-researched guides featuring detailed itineraries, artisan workshops, and respectful local etiquette.
                </p>
              </div>
              <Link to="/guides" className="view-all-link">
                <span>Explore all articles</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="guides-grid-home">
              {GUIDE_ARTICLES.slice(0, 3).map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: THE RAAHI PHILOSOPHY */}
        <section className="section-philosophy" aria-labelledby="philosophy-heading">
          <div className="container">
            <div className="philosophy-box">
              <div className="philosophy-left">
                <span className="section-eyebrow">The Raahi Philosophy</span>
                <h2 id="philosophy-heading" className="philosophy-title">
                  Mindful, Culturally Rooted Indian Travel
                </h2>
                <p className="philosophy-text">
                  Too often, modern travel becomes a race to collect passport stamps and social media snapshots. Raahi was created to champion deliberate, considerate journeys—pausing to understand the architecture of an ancient stepwell, supporting handloom weavers directly, and respecting fragile alpine habitats.
                </p>
                <div className="philosophy-points">
                  <div className="philosophy-point">
                    <CheckCircle size={18} className="point-icon" aria-hidden="true" />
                    <div>
                      <strong>Living Craft Guilds:</strong> Connecting travelers with generational artisans in Sanganer, Athangudi, and Varanasi.
                    </div>
                  </div>
                  <div className="philosophy-point">
                    <CheckCircle size={18} className="point-icon" aria-hidden="true" />
                    <div>
                      <strong>Ecological Stewardship:</strong> Leave-no-trace ethics in high-altitude zones like Spiti and the Western Ghats.
                    </div>
                  </div>
                  <div className="philosophy-point">
                    <CheckCircle size={18} className="point-icon" aria-hidden="true" />
                    <div>
                      <strong>Transparent Planning:</strong> Realistic durations, indicative cost estimates, and client-side itinerary tools.
                    </div>
                  </div>
                </div>
              </div>

              <div className="philosophy-right">
                <div className="philosophy-stat-card">
                  <span className="stat-number">14+</span>
                  <span className="stat-label">Diverse Destinations Across 6 Regions</span>
                </div>
                <div className="philosophy-stat-card">
                  <span className="stat-number">6+</span>
                  <span className="stat-label">In-Depth Curated Field Journals</span>
                </div>
                <div className="philosophy-stat-card">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Authentic Local Cultural Experiences</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: TRIP PLANNER CTA BANNER */}
        <section className="section-planner-cta" aria-labelledby="planner-cta-heading">
          <div className="container">
            <div className="planner-cta-card">
              <div className="planner-cta-content">
                <span className="badge badge-sand">Interactive Client Tool</span>
                <h2 id="planner-cta-heading" className="planner-cta-title">
                  Ready to Craft Your Personal Itinerary?
                </h2>
                <p className="planner-cta-desc">
                  Select your dream destinations, customize duration and travel style, reorder stops, and download or print a complete travel dossier—all stored securely in your browser.
                </p>
                <div className="planner-cta-actions">
                  <Link to="/plan" className="btn btn-terracotta">
                    <Compass size={18} aria-hidden="true" />
                    <span>Launch Free Trip Planner</span>
                  </Link>
                  <Link to="/explore" className="btn btn-secondary planner-cta-secondary">
                    <span>Browse Catalog First</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

