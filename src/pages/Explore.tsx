import React, { useState, useEffect, useMemo, useId } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, X, RotateCcw, ArrowUpDown, 
  MapPin, Check, Filter, Compass 
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { DestinationCard } from '../components/DestinationCard';
import { EmptyState } from '../components/EmptyState';
import { DESTINATIONS, Destination } from '../data/destinations';
import './Explore.css';

interface ExploreProps {
  onAddToPlanner?: (dest: Destination) => void;
  plannerDestinationIds?: string[];
}

export const Explore: React.FC<ExploreProps> = ({ 
  onAddToPlanner, 
  plannerDestinationIds = [] 
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputId = useId();

  // Extract filter parameters from URL query params
  const qParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'All';
  const regionParam = searchParams.get('region') || 'All';
  const budgetParam = searchParams.get('budget') || 'All';
  const durationParam = searchParams.get('duration') || 'All';
  const sortParam = searchParams.get('sort') || 'curated';

  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state helpers
  const updateQueryParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'All' || (key === 'sort' && value === 'curated')) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams, { replace: false });
  };

  const clearAllFilters = () => {
    setSearchParams({}, { replace: false });
  };

  const categories = [
    'All',
    'Mountains & Mist',
    'Culture & Heritage',
    'Beaches & Coastlines',
    'Nature & Wildlife',
    'Slow Travel',
    'Weekend Escapes'
  ];

  const regions = [
    'All',
    'North',
    'South',
    'West',
    'East',
    'Northeast',
    'Central'
  ];

  const budgetCategories = [
    'All',
    'Budget-conscious',
    'Moderate comfort',
    'Boutique & Heritage'
  ];

  const durations = [
    'All',
    '2-3 days',
    '4-5 days',
    '6+ days'
  ];

  // Filtering & Sorting Logic
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      // Search text filter
      if (qParam.trim()) {
        const query = qParam.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesState = item.state.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesHighlights = item.highlights.some(h => h.toLowerCase().includes(query));
        if (!matchesName && !matchesState && !matchesCategory && !matchesHighlights) {
          return false;
        }
      }

      // Category filter
      if (categoryParam !== 'All' && item.category !== categoryParam) {
        return false;
      }

      // Region filter
      if (regionParam !== 'All' && item.region !== regionParam) {
        return false;
      }

      // Budget filter
      if (budgetParam !== 'All' && item.budgetCategory !== budgetParam) {
        return false;
      }

      // Duration filter
      if (durationParam !== 'All' && item.idealDuration !== durationParam) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortParam === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortParam === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortParam === 'duration-asc') {
        return a.durationDays - b.durationDays;
      }
      if (sortParam === 'cost-asc') {
        return a.indicativeDailyCost - b.indicativeDailyCost;
      }
      // Default: curated editorial order
      return 0;
    });
  }, [qParam, categoryParam, regionParam, budgetParam, durationParam, sortParam]);

  const hasActiveFilters = qParam !== '' || categoryParam !== 'All' || regionParam !== 'All' || budgetParam !== 'All' || durationParam !== 'All';

  // Prevent background scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  return (
    <>
      <SEOHead
        title="Explore Indian Destinations by Region and Travel Style | Raahi"
        description="Search and filter through 14+ authentic Indian destinations by landscape mood, geographical region, duration, and indicative budget."
        canonicalPath="/explore"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Explore Indian Destinations — Raahi",
          "description": "Catalog of curated Indian destinations across North, South, Northeast, West, and Central India.",
          "url": "https://raahi-travel.example.com/explore",
          "itemListElement": filteredDestinations.slice(0, 10).map((dest, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": dest.name,
            "description": dest.shortDescription
          }))
        }}
      />

      <main id="main-content" className="explore-page">
        {/* Page Header */}
        <section className="explore-hero" aria-labelledby="explore-title">
          <div className="container">
            <span className="badge badge-sand">Destination Catalog</span>
            <h1 id="explore-title" className="explore-hero-title">
              Find your kind of India.
            </h1>
            <p className="explore-hero-desc">
              Discover verified destinations across 6 Indian geographical regions. Filter by landscape atmosphere, trip duration, and estimated budget to tailor your journey.
            </p>

            {/* Main Search Control */}
            <div className="explore-search-bar">
              <label htmlFor={searchInputId} className="sr-only">Search destinations by name, state, or attraction</label>
              <Search size={20} className="explore-search-icon" aria-hidden="true" />
              <input
                id={searchInputId}
                type="search"
                value={qParam}
                onChange={(e) => updateQueryParam('q', e.target.value)}
                placeholder="Search Jaipur, Kerala, Spiti, waterfalls, or tea estates..."
                className="explore-search-input"
              />
              {qParam && (
                <button
                  type="button"
                  onClick={() => updateQueryParam('q', '')}
                  className="explore-search-clear"
                  aria-label="Clear destination search text"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Content Section: Sidebar Filters + Card Grid */}
        <div className="container explore-body">
          {/* Controls Bar (Mobile Filter Toggle + Results Count + Sorting) */}
          <div className="explore-toolbar">
            <div className="toolbar-left">
              <button
                type="button"
                className="mobile-filter-btn"
                onClick={() => setIsMobileFilterOpen(true)}
                aria-label="Open filter options"
              >
                <Filter size={18} aria-hidden="true" />
                <span>Filters {hasActiveFilters && `(${[categoryParam, regionParam, budgetParam, durationParam].filter(v => v !== 'All').length + (qParam ? 1 : 0)})`}</span>
              </button>

              <span className="results-counter" aria-live="polite">
                Showing <strong>{filteredDestinations.length}</strong> of <strong>{DESTINATIONS.length}</strong> destinations
              </span>
            </div>

            <div className="toolbar-right">
              <label htmlFor="sort-select" className="sort-label">
                <ArrowUpDown size={15} aria-hidden="true" />
                <span>Sort by:</span>
              </label>
              <select
                id="sort-select"
                value={sortParam}
                onChange={(e) => updateQueryParam('sort', e.target.value)}
                className="sort-dropdown"
              >
                <option value="curated">Curated Editorial</option>
                <option value="name-asc">Name (A to Z)</option>
                <option value="name-desc">Name (Z to A)</option>
                <option value="duration-asc">Duration (Shortest first)</option>
                <option value="cost-asc">Indicative Cost (Lowest first)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills Row */}
          {hasActiveFilters && (
            <div className="active-pills-row" aria-label="Active filter criteria">
              <span className="active-pills-label">Active filters:</span>
              {qParam && (
                <button 
                  type="button" 
                  onClick={() => updateQueryParam('q', '')}
                  className="filter-pill"
                >
                  <span>Query: "{qParam}"</span>
                  <X size={13} aria-hidden="true" />
                </button>
              )}
              {categoryParam !== 'All' && (
                <button 
                  type="button" 
                  onClick={() => updateQueryParam('category', 'All')}
                  className="filter-pill"
                >
                  <span>{categoryParam}</span>
                  <X size={13} aria-hidden="true" />
                </button>
              )}
              {regionParam !== 'All' && (
                <button 
                  type="button" 
                  onClick={() => updateQueryParam('region', 'All')}
                  className="filter-pill"
                >
                  <span>Region: {regionParam}</span>
                  <X size={13} aria-hidden="true" />
                </button>
              )}
              {budgetParam !== 'All' && (
                <button 
                  type="button" 
                  onClick={() => updateQueryParam('budget', 'All')}
                  className="filter-pill"
                >
                  <span>{budgetParam}</span>
                  <X size={13} aria-hidden="true" />
                </button>
              )}
              {durationParam !== 'All' && (
                <button 
                  type="button" 
                  onClick={() => updateQueryParam('duration', 'All')}
                  className="filter-pill"
                >
                  <span>{durationParam}</span>
                  <X size={13} aria-hidden="true" />
                </button>
              )}
              <button 
                type="button" 
                onClick={clearAllFilters} 
                className="clear-all-btn"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Reset all</span>
              </button>
            </div>
          )}

          {/* Main Layout: Desktop Sidebar Filters + Cards Grid */}
          <div className="explore-layout">
            {/* Desktop Filters Sidebar */}
            <aside className="explore-sidebar" aria-label="Filters Sidebar">
              <div className="sidebar-sticky">
                <div className="sidebar-header">
                  <h2 className="sidebar-title">Refine Search</h2>
                  {hasActiveFilters && (
                    <button 
                      type="button" 
                      onClick={clearAllFilters} 
                      className="sidebar-reset-link"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Filter Group: Category */}
                <div className="filter-group">
                  <span className="filter-group-title">Travel Mood & Category</span>
                  <div className="filter-options-list">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => updateQueryParam('category', cat)}
                        className={`filter-option-btn ${categoryParam === cat ? 'filter-option-btn--active' : ''}`}
                      >
                        <span>{cat}</span>
                        {categoryParam === cat && <Check size={14} aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Group: Region */}
                <div className="filter-group">
                  <span className="filter-group-title">Geographical Region</span>
                  <div className="filter-options-list">
                    {regions.map((reg) => (
                      <button
                        key={reg}
                        type="button"
                        onClick={() => updateQueryParam('region', reg)}
                        className={`filter-option-btn ${regionParam === reg ? 'filter-option-btn--active' : ''}`}
                      >
                        <span>{reg}</span>
                        {regionParam === reg && <Check size={14} aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Group: Ideal Duration */}
                <div className="filter-group">
                  <span className="filter-group-title">Trip Duration</span>
                  <div className="filter-options-list">
                    {durations.map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => updateQueryParam('duration', dur)}
                        className={`filter-option-btn ${durationParam === dur ? 'filter-option-btn--active' : ''}`}
                      >
                        <span>{dur}</span>
                        {durationParam === dur && <Check size={14} aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Group: Budget */}
                <div className="filter-group">
                  <span className="filter-group-title">Indicative Budget Style</span>
                  <div className="filter-options-list">
                    {budgetCategories.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => updateQueryParam('budget', b)}
                        className={`filter-option-btn ${budgetParam === b ? 'filter-option-btn--active' : ''}`}
                      >
                        <span>{b}</span>
                        {budgetParam === b && <Check size={14} aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                  <span className="filter-disclaimer-note">
                    *Tiers are indicative traveler planning baselines, not guaranteed commercial rates.
                  </span>
                </div>
              </div>
            </aside>

            {/* Results Grid / Empty State */}
            <section className="explore-results" aria-label="Destinations List">
              {filteredDestinations.length > 0 ? (
                <div className="explore-grid">
                  {filteredDestinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onAddToPlanner={onAddToPlanner}
                      isAddedToPlanner={plannerDestinationIds.includes(dest.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No destinations match your filters"
                  description="We couldn't find any places matching your current search or category combination. Try clearing your filters or exploring another region."
                  actionLabel="Reset All Filters"
                  onAction={clearAllFilters}
                />
              )}
            </section>
          </div>
        </div>

        {/* Mobile Filter Drawer Overlay */}
        <div 
          className={`mobile-filter-drawer ${isMobileFilterOpen ? 'mobile-filter-drawer--open' : ''}`}
          aria-hidden={!isMobileFilterOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Filter Destinations"
        >
          <div className="mobile-filter-backdrop" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="mobile-filter-panel">
            <div className="mobile-filter-header">
              <h2 className="mobile-filter-title">Filter Destinations</h2>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="mobile-filter-close"
                aria-label="Close filters drawer"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <div className="mobile-filter-scroll">
              {/* Category */}
              <div className="filter-group">
                <span className="filter-group-title">Category</span>
                <div className="filter-options-list">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => updateQueryParam('category', cat)}
                      className={`filter-option-btn ${categoryParam === cat ? 'filter-option-btn--active' : ''}`}
                    >
                      <span>{cat}</span>
                      {categoryParam === cat && <Check size={14} aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div className="filter-group">
                <span className="filter-group-title">Region</span>
                <div className="filter-options-list">
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => updateQueryParam('region', reg)}
                      className={`filter-option-btn ${regionParam === reg ? 'filter-option-btn--active' : ''}`}
                    >
                      <span>{reg}</span>
                      {regionParam === reg && <Check size={14} aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="filter-group">
                <span className="filter-group-title">Duration</span>
                <div className="filter-options-list">
                  {durations.map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => updateQueryParam('duration', dur)}
                      className={`filter-option-btn ${durationParam === dur ? 'filter-option-btn--active' : ''}`}
                    >
                      <span>{dur}</span>
                      {durationParam === dur && <Check size={14} aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="filter-group">
                <span className="filter-group-title">Budget Tier</span>
                <div className="filter-options-list">
                  {budgetCategories.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => updateQueryParam('budget', b)}
                      className={`filter-option-btn ${budgetParam === b ? 'filter-option-btn--active' : ''}`}
                    >
                      <span>{b}</span>
                      {budgetParam === b && <Check size={14} aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mobile-filter-footer">
              <button 
                type="button" 
                onClick={clearAllFilters} 
                className="btn btn-secondary btn-full"
              >
                Clear All
              </button>
              <button 
                type="button" 
                onClick={() => setIsMobileFilterOpen(false)} 
                className="btn btn-primary btn-full"
              >
                View {filteredDestinations.length} Results
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

