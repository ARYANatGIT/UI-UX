import React, { useState, useMemo, useId } from 'react';
import { Search, BookOpen, Clock, Tag, Sparkles, X } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { GuideCard } from '../components/GuideCard';
import { GUIDE_ARTICLES, GuideArticle } from '../data/guides';
import './Guides.css';

export const Guides: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchInputId = useId();

  const categories = [
    'All',
    'Heritage & Culture',
    'Nature & Treks',
    'Weekend Itineraries'
  ];

  const filteredGuides = useMemo(() => {
    return GUIDE_ARTICLES.filter((article) => {
      if (selectedCategory !== 'All' && article.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesDest = article.destinationName.toLowerCase().includes(q);
        const matchesMeta = article.metaDescription.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDest && !matchesMeta) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article is the first guide when viewing "All" and no search
  const isDefaultView = selectedCategory === 'All' && !searchQuery.trim();
  const featuredArticle = isDefaultView ? GUIDE_ARTICLES[0] : null;
  const regularArticles = isDefaultView ? GUIDE_ARTICLES.slice(1) : filteredGuides;

  return (
    <>
      <SEOHead
        title="India Travel Guides and Itineraries | Raahi"
        description="Read in-depth, culturally rooted travel itineraries and field guides for India: Jaipur, Munnar, Rishikesh, Spiti Valley, and living root bridges."
        canonicalPath="/guides"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "The Raahi Travel Journal",
          "description": "Field guides, architectural histories, and mindful itineraries across India.",
          "url": "https://raahi-travel-three.vercel.app/guides",
          "blogPost": GUIDE_ARTICLES.map((g) => ({
            "@type": "BlogPosting",
            "headline": g.title,
            "description": g.metaDescription,
            "url": `https://raahi-travel-three.vercel.app/guides/${g.slug}`,
            "datePublished": g.publishedDate,
            "author": {
              "@type": "Person",
              "name": g.author.name
            }
          }))
        }}
      />

      <main id="main-content" className="guides-page">
        {/* Editorial Journal Header */}
        <section className="guides-hero" aria-labelledby="journal-title">
          <div className="container">
            <span className="badge badge-sand">The Raahi Journal</span>
            <h1 id="journal-title" className="guides-hero-title">
              Stories, Routes & Contemplations.
            </h1>
            <p className="guides-hero-desc">
              Long-form field guides written with care. We explore the historical context, local craft lineages, and quiet backstreets of India’s most resonant landscapes.
            </p>

            {/* Filter and Search Bar */}
            <div className="guides-filter-bar">
              <div className="guides-search-input-box">
                <label htmlFor={searchInputId} className="sr-only">Search travel guides</label>
                <Search size={18} className="guides-search-icon" aria-hidden="true" />
                <input
                  id={searchInputId}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, region, or topic..."
                  className="guides-search-input"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery('')}
                    className="guides-search-clear"
                    aria-label="Clear article search"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Category Filter Tabs */}
              <div className="guides-category-tabs" role="tablist" aria-label="Article categories">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`category-tab-btn ${selectedCategory === cat ? 'category-tab-btn--active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guides Listing Container */}
        <div className="container guides-listing-section">
          {/* Results count indicator when filtered */}
          {(!isDefaultView) && (
            <div className="guides-filter-status" aria-live="polite">
              <span>Found <strong>{filteredGuides.length}</strong> journal articles</span>
              <button 
                type="button" 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="guides-reset-btn"
              >
                Reset view
              </button>
            </div>
          )}

          {/* Featured Article Cover (only on default view) */}
          {featuredArticle && (
            <div className="featured-article-container">
              <span className="featured-editorial-label">Featured Cover Story</span>
              <GuideCard guide={featuredArticle} featured={true} />
            </div>
          )}

          {/* Grid of Journal Articles */}
          {regularArticles.length > 0 ? (
            <div className="guides-magazine-grid">
              {regularArticles.map((article) => (
                <GuideCard key={article.slug} guide={article} />
              ))}
            </div>
          ) : (
            <div className="guides-empty-box">
              <BookOpen size={40} className="guides-empty-icon" aria-hidden="true" />
              <h3>No articles found</h3>
              <p>We couldn't find any guides matching your criteria. Try selecting another category or resetting your search.</p>
              <button 
                type="button" 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="btn btn-secondary btn-sm"
              >
                Show All Articles
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

