import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
}

const DEFAULT_SITE_URL = 'https://raahi-travel.example.com';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  structuredData,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 2. Primary Meta Description
    setMetaTag('name', 'description', description);

    // 3. Canonical Link Tag
    const siteUrl = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const fullCanonicalUrl = `${siteUrl}${cleanPath === '/' ? '' : cleanPath}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. Open Graph Metadata
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'Raahi');

    // 5. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 6. JSON-LD Structured Data
    const SCRIPT_ID = 'route-structured-data';
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalPath, ogType, ogImage, structuredData]);

  return null;
};

