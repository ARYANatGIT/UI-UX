import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Compass, Plus, Check, ArrowRight } from 'lucide-react';
import { Destination } from '../data/destinations';
import './DestinationCard.css';

interface DestinationCardProps {
  destination: Destination;
  onAddToPlanner?: (dest: Destination) => void;
  isAddedToPlanner?: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onAddToPlanner,
  isAddedToPlanner = false
}) => {
  return (
    <article className="destination-card">
      {/* Visual Image Container */}
      <div className="dest-image-wrapper">
        <img
          src={destination.thumbnailImage.url}
          alt={destination.thumbnailImage.alt}
          width={destination.thumbnailImage.width}
          height={destination.thumbnailImage.height}
          loading="lazy"
          className="dest-image"
        />
        <div className="dest-overlay-tags">
          <span className="dest-pill dest-pill--region">{destination.region}</span>
          <span className="dest-pill dest-pill--duration">
            <Clock size={12} aria-hidden="true" />
            <span>{destination.idealDuration}</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="dest-content">
        <div className="dest-header">
          <div className="dest-geo">
            <MapPin size={15} className="dest-pin-icon" aria-hidden="true" />
            <span>{destination.state}</span>
          </div>
          <span className="dest-category">{destination.category}</span>
        </div>

        <h3 className="dest-title">
          {destination.name}
        </h3>

        <p className="dest-desc">
          {destination.shortDescription}
        </p>

        {/* Highlights List */}
        <div className="dest-highlights">
          <span className="highlights-label">Highlights:</span>
          <ul className="highlights-list">
            {destination.highlights.slice(0, 2).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Bottom Actions */}
        <div className="dest-footer">
          <div className="dest-budget-hint">
            <span className="budget-label">Indicative:</span>
            <span className="budget-value">₹{destination.indicativeDailyCost.toLocaleString('en-IN')}/day</span>
          </div>

          <div className="dest-actions">
            {onAddToPlanner && (
              <button
                type="button"
                onClick={() => onAddToPlanner(destination)}
                className={`btn-icon-action ${isAddedToPlanner ? 'btn-icon-action--active' : ''}`}
                aria-label={isAddedToPlanner ? `Remove ${destination.name} from itinerary` : `Add ${destination.name} to itinerary`}
                title={isAddedToPlanner ? 'In your itinerary' : 'Add to itinerary'}
              >
                {isAddedToPlanner ? (
                  <>
                    <Check size={16} aria-hidden="true" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} aria-hidden="true" />
                    <span>Plan</span>
                  </>
                )}
              </button>
            )}

            {destination.guideSlug ? (
              <Link 
                to={`/guides/${destination.guideSlug}`} 
                className="btn-read-guide"
                aria-label={`Read in-depth travel guide for ${destination.name}`}
              >
                <span>Guide</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ) : (
              <Link 
                to={`/explore?q=${encodeURIComponent(destination.name)}`}
                className="btn-read-guide"
                aria-label={`Explore details for ${destination.name}`}
              >
                <span>Details</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

