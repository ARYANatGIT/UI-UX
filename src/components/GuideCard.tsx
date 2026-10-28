import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, ArrowRight, User } from 'lucide-react';
import { GuideArticle } from '../data/guides';
import './GuideCard.css';

interface GuideCardProps {
  guide: GuideArticle;
  featured?: boolean;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, featured = false }) => {
  return (
    <article className={`guide-card ${featured ? 'guide-card--featured' : ''}`}>
      <div className="guide-card-image-box">
        <img
          src={guide.heroImage.url}
          alt={guide.heroImage.alt}
          width={guide.heroImage.width}
          height={guide.heroImage.height}
          loading="lazy"
          className="guide-card-image"
        />
        <div className="guide-card-pill-row">
          <span className="guide-category-pill">{guide.category}</span>
          <span className="guide-time-pill">
            <Clock size={12} aria-hidden="true" />
            <span>{guide.readTime}</span>
          </span>
        </div>
      </div>

      <div className="guide-card-body">
        <div className="guide-card-meta">
          <span className="guide-destination-badge">{guide.destinationName}</span>
          <span className="guide-meta-sep">•</span>
          <time dateTime={guide.publishedDate}>
            {new Date(guide.publishedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </div>

        <h3 className="guide-card-title">
          <Link to={`/guides/${guide.slug}`} className="guide-title-link">
            {guide.title}
          </Link>
        </h3>

        <p className="guide-card-desc">
          {guide.subtitle || guide.metaDescription}
        </p>

        <div className="guide-card-footer">
          <div className="guide-author">
            <User size={13} className="guide-author-icon" aria-hidden="true" />
            <span className="guide-author-name">{guide.author.name}</span>
          </div>

          <Link to={`/guides/${guide.slug}`} className="guide-card-cta" aria-label={`Read guide: ${guide.title}`}>
            <span>Read Journal</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

