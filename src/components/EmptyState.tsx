import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import './EmptyState.css';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No destinations found',
  description = 'Try clearing your search query or loosening your filter criteria to discover other parts of India.',
  actionLabel = 'Reset All Filters',
  onAction
}) => {
  return (
    <div className="empty-state-box" role="region" aria-live="polite">
      <div className="empty-state-icon-circle">
        <Compass size={32} className="empty-state-icon" aria-hidden="true" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {onAction && (
        <button type="button" onClick={onAction} className="btn btn-secondary btn-sm empty-state-btn">
          <RotateCcw size={15} aria-hidden="true" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

