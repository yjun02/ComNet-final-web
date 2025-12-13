import React, { useEffect } from 'react';

/**
 * Google AdSense Component for React
 * Handles ad initialization and rendering
 */
export function AdSense({ 
  adClient = "ca-pub-5930106978959184",
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = {},
  className = ""
}) {
  useEffect(() => {
    try {
      // Push ad to AdSense queue
      if (window.adsbygoogle && process.env.NODE_ENV !== 'development') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

/**
 * Sidebar Display Ad - Vertical banner for sidebar
 */
export function SidebarAd() {
  return (
    <AdSense
      adSlot="9391054607"
      adFormat="auto"
      className="my-4"
    />
  );
}

/**
 * In-Article Ad - Small ad between content sections
 */
export function InArticleAd() {
  return (
    <AdSense
      adSlot="7800988371"
      adFormat="fluid"
      className="my-8"
      style={{ textAlign: 'center' }}
    />
  );
}
