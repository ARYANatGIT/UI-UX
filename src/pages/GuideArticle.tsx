import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Clock, Calendar, User, Compass, MapPin, 
  ChevronRight, ArrowLeft, ArrowRight, Share2, 
  Bookmark, CheckCircle, Info, ShieldAlert 
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GUIDE_ARTICLES } from '../data/guides';
import { DESTINATIONS, Destination } from '../data/destinations';
import './GuideArticle.css';

interface GuideArticlePageProps {
  onAddToPlanner?: (dest: Destination) => void;
  plannerDestinationIds?: string[];
  onTriggerToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const GuideArticlePage: React.FC<GuideArticlePageProps> = ({
  onAddToPlanner,
  plannerDestinationIds = [],
  onTriggerToast
}) => {
  const { slug } = useParams<{ slug: string }>();

  const article = GUIDE_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/guides" replace />;
  }

  // Find linked destination object
  const destination = DESTINATIONS.find((d) => d.id === article.destinationId);

  // Related articles
  const relatedArticles = GUIDE_ARTICLES.filter((a) => 
    article.relatedGuideSlugs.includes(a.slug)
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.metaDescription,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onTriggerToast) {
        onTriggerToast('Article link copied to clipboard!', 'info');
      }
    }
  };

  return (
    <>
      <SEOHead
        title={`${article.title} | Raahi Travel Journal`}
        description={article.metaDescription}
        canonicalPath={`/guides/${article.slug}`}
        ogType="article"
        ogImage={article.heroImage.url}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.h1,
          "description": article.metaDescription,
          "image": article.heroImage.url,
          "datePublished": article.publishedDate,
          "author": {
            "@type": "Person",
            "name": article.author.name,
            "jobTitle": article.author.role
          },
          "publisher": {
            "@type": "Organization",
            "name": "Raahi",
            "logo": {
              "@type": "ImageObject",
              "url": "https://raahi-travel.example.com/favicon.svg"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://raahi-travel.example.com/guides/${article.slug}`
          }
        }}
      />

      <article className="guide-detail-page">
        {/* Header Bar & Breadcrumbs */}
        <div className="guide-detail-top-bar">
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Travel Guides', path: '/guides' },
                { label: article.destinationName }
              ]}
            />
          </div>
        </div>

        {/* Editorial Title Header */}
        <header className="guide-detail-header">
          <div className="container-reading">
            <div className="guide-badges-row">
              <span className="badge badge-sand">{article.category}</span>
              <span className="guide-duration-tag">
                <Clock size={13} aria-hidden="true" />
                <span>{article.durationBadge}</span>
              </span>
            </div>

            <h1 className="guide-detail-h1">
              {article.h1}
            </h1>

            <p className="guide-detail-lead">
              {article.subtitle}
            </p>

            <div className="guide-author-bar">
              <div className="author-info">
                <div className="author-avatar" aria-hidden="true">
                  <User size={18} />
                </div>
                <div>
                  <span className="author-name">{article.author.name}</span>
                  <span className="author-role">{article.author.role}</span>
                </div>
              </div>

              <div className="article-meta-info">
                <time dateTime={article.publishedDate}>
                  {new Date(article.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <span className="meta-sep">•</span>
                <span>{article.readTime}</span>
                <span className="meta-sep">•</span>
                <button 
                  type="button" 
                  onClick={handleShare}
                  className="btn-share-article"
                  aria-label="Share this guide"
                  title="Share or copy article link"
                >
                  <Share2 size={14} aria-hidden="true" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Image Container */}
        <div className="guide-hero-image-wrap">
          <div className="container-narrow">
            <figure className="guide-figure">
              <img
                src={article.heroImage.url}
                alt={article.heroImage.alt}
                width={article.heroImage.width}
                height={article.heroImage.height}
                className="guide-hero-img"
                fetchPriority="high"
              />
              <figcaption className="guide-hero-caption">
                <span className="caption-text">{article.heroImage.caption}</span>
                <span className="caption-loc">{article.destinationName}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Article Body Layout: Content + Sticky Sidebar */}
        <div className="container-narrow guide-body-layout">
          {/* Main Article Content */}
          <div className="guide-main-content">
            {/* Quick Trip Blueprint Overview Box */}
            <div className="guide-blueprint-card">
              <div className="blueprint-header">
                <Compass size={18} className="blueprint-icon" aria-hidden="true" />
                <h2 className="blueprint-title">At a Glance: Journey Blueprint</h2>
              </div>
              <div className="blueprint-grid">
                <div className="blueprint-item">
                  <span className="blueprint-label">Ideal Duration</span>
                  <span className="blueprint-val">{article.durationBadge}</span>
                </div>
                <div className="blueprint-item">
                  <span className="blueprint-label">Best Season</span>
                  <span className="blueprint-val">{article.bestSeason}</span>
                </div>
                <div className="blueprint-item">
                  <span className="blueprint-label">Indicative Cost</span>
                  <span className="blueprint-val">{article.indicativeBudget}</span>
                </div>
                <div className="blueprint-item">
                  <span className="blueprint-label">Region</span>
                  <span className="blueprint-val">{article.destinationName}</span>
                </div>
              </div>

              {destination && onAddToPlanner && (
                <div className="blueprint-action-bar">
                  <button
                    type="button"
                    onClick={() => onAddToPlanner(destination)}
                    className="btn btn-terracotta btn-sm"
                  >
                    <Bookmark size={15} aria-hidden="true" />
                    <span>
                      {plannerDestinationIds.includes(destination.id) 
                        ? 'In Your Trip Planner' 
                        : `Add ${destination.name} to Trip Planner`}
                    </span>
                  </button>
                  <Link to="/plan" className="btn btn-ghost btn-sm">
                    <span>Open Planner →</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Intro Narrative */}
            <section className="guide-intro-section" aria-label="Introduction">
              <p className="article-intro-para">
                {article.intro}
              </p>
            </section>

            {/* Main Article Sections with working in-page anchors */}
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="article-section">
                <h2 className="section-anchor-heading">
                  <a href={`#${section.id}`} className="anchor-link" aria-label={`Link to ${section.title}`}>
                    {section.title}
                  </a>
                </h2>
                <p>{section.content}</p>

                {section.subsections && section.subsections.map((sub) => (
                  <div key={sub.id} id={sub.id} className="article-subsection">
                    <h3 className="subsection-heading">{sub.title}</h3>
                    <p>{sub.content}</p>
                  </div>
                ))}
              </section>
            ))}

            {/* Cultural Etiquette Section */}
            <section id="cultural-etiquette-box" className="etiquette-callout-box">
              <div className="callout-header">
                <Info size={20} className="callout-icon" aria-hidden="true" />
                <h2 className="callout-title">Mindful Exploration & Local Etiquette</h2>
              </div>
              <ul className="etiquette-list">
                {article.culturalEtiquette.map((tip, idx) => (
                  <li key={idx}>
                    <CheckCircle size={15} className="etiquette-check" aria-hidden="true" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Practical Logistics */}
            <section id="practical-logistics-box" className="logistics-callout-box">
              <h2 className="callout-title">Practical Logistics</h2>
              <div className="logistics-grid">
                {article.practicalTips.map((tip, idx) => (
                  <div key={idx} className="logistics-item">
                    <span className="logistics-tag">{tip.category}</span>
                    <p className="logistics-desc">{tip.details}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Internal Link to Explore / Planner */}
            <div className="article-bottom-cta">
              <div className="bottom-cta-inner">
                <h3>Inspired to visit {destination?.name || 'India'}?</h3>
                <p>Add this destination to your customized day-by-day itinerary or discover similar places in the same geographical region.</p>
                <div className="bottom-cta-buttons">
                  <Link to="/plan" className="btn btn-primary">
                    <Compass size={16} aria-hidden="true" />
                    <span>Start Planning Itinerary</span>
                  </Link>
                  <Link to="/explore" className="btn btn-secondary">
                    <span>Explore More Places</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Editorial Sidebar: Table of Contents & Quick Facts */}
          <aside className="guide-sidebar" aria-label="Table of Contents">
            <div className="sidebar-toc-sticky">
              <div className="toc-card">
                <span className="toc-header-title">Table of Contents</span>
                <nav aria-label="Article Table of Contents">
                  <ul className="toc-list">
                    {article.toc.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="toc-link">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Destination Fact Card */}
              {destination && (
                <div className="sidebar-destination-box">
                  <span className="toc-header-title">Destination Profile</span>
                  <h3 className="dest-profile-title">{destination.name}</h3>
                  <span className="dest-profile-state">{destination.state} ({destination.region} India)</span>
                  <p className="dest-profile-hub">
                    <strong>Transit Hub:</strong> {destination.nearestHub}
                  </p>
                  <Link to={`/explore?q=${encodeURIComponent(destination.name)}`} className="dest-profile-link">
                    <span>View in destination catalog</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Related Articles Footer */}
        {relatedArticles.length > 0 && (
          <section className="section-related-guides" aria-labelledby="related-heading">
            <div className="container-narrow">
              <div className="related-header">
                <span className="section-eyebrow">Continue Reading</span>
                <h2 id="related-heading" className="related-title">
                  Related Travel Journals
                </h2>
              </div>
              <div className="related-guides-grid">
                {relatedArticles.map((rel) => (
                  <Link key={rel.slug} to={`/guides/${rel.slug}`} className="related-guide-mini-card">
                    <img 
                      src={rel.heroImage.url} 
                      alt={rel.heroImage.alt}
                      loading="lazy"
                      className="related-guide-thumb" 
                      width={400}
                      height={260}
                    />
                    <div className="related-mini-content">
                      <span className="related-category">{rel.category}</span>
                      <h3 className="related-mini-title">{rel.title}</h3>
                      <span className="related-read-more">
                        <span>Read journal</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
};

