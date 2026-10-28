import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumbs" className="breadcrumbs-nav">
      <ol className="breadcrumbs">
        <li>
          <Link to="/" aria-label="Raahi Home">
            <Home size={14} style={{ display: 'inline', verticalAlign: '-1px' }} aria-hidden="true" />
            <span style={{ marginLeft: '4px' }}>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" style={{ color: 'var(--color-charcoal-400)', display: 'inline-flex', alignItems: 'center' }}>
                <ChevronRight size={12} />
              </li>
              <li>
                {isLast || !item.path ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <Link to={item.path}>{item.label}</Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

