import React, { useState, useMemo } from 'react';
import './App.css';
import { properties } from './data/mockData';

function App() {
  const [locationFilter, setLocationFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Location
      if (locationFilter !== 'All' && property.location !== locationFilter) return false;
      
      // Type
      if (typeFilter !== 'All' && property.type !== typeFilter) return false;

      // Price
      if (priceFilter !== 'All') {
        const price = property.price;
        if (priceFilter === 'Under50') {
          if (price >= 50000000) return false;
        } else if (priceFilter === '50to150') {
          if (price < 50000000 || price > 150000000) return false;
        } else if (priceFilter === 'Over150') {
          if (price <= 150000000) return false;
        }
      }
      return true;
    });
  }, [locationFilter, priceFilter, typeFilter]);

  const formatPrice = (price) => {
    return '₦' + (price / 1000000).toFixed(1) + 'M';
  };

  return (
    <div className="main-content">
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            Premium<span>Estates</span>
          </div>
          <nav className="nav-links">
            <a href="#" className="nav-link">Listings</a>
            <a href="#" className="nav-link">About Us</a>
            <a href="#" className="nav-link">Contact</a>
            <button className="btn btn-primary">Book Viewing</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Find Your Dream <span>Home</span></h1>
          <p>Discover the most premium houses and apartments across Jos and Abuja. Elegance meets comfort in our exclusive listings.</p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="filter-bar-wrapper">
        <div className="filter-bar">
          <div className="filter-group">
            <label>Location</label>
            <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
              <option value="All">All Locations</option>
              <option value="Abuja">Abuja</option>
              <option value="Jos">Jos</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Property Type</label>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="All">All Types</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Price Range</label>
            <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)}>
              <option value="All">Any Price</option>
              <option value="Under50">Under ₦50M</option>
              <option value="50to150">₦50M - ₦150M</option>
              <option value="Over150">Over ₦150M</option>
            </select>
          </div>
          <button className="btn btn-accent filter-button" onClick={() => {}}>
            Search
          </button>
        </div>
      </div>

      {/* Property Section */}
      <section className="property-section bg-color">
        <div className="container">
          <div className="section-header">
            <h2>Exclusive Listings</h2>
            <p>Handpicked properties just for you in {locationFilter === 'All' ? 'Jos & Abuja' : locationFilter}</p>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <p>No properties match your current filters. Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="property-grid">
              {filteredProperties.map(property => (
                <div key={property.id} className="property-card">
                  <div className="property-image-container">
                    <div className="property-badge">{property.type}</div>
                    {property.featured && <div className="property-featured">Featured</div>}
                    <img src={property.image} alt={property.title} className="property-image" />
                  </div>
                  <div className="property-details">
                    <div className="property-price">{formatPrice(property.price)}</div>
                    <h3 className="property-title">{property.title}</h3>
                    <div className="property-location">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {property.location}
                    </div>
                    <div className="property-meta">
                      <div className="meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        {property.beds} Beds
                      </div>
                      <div className="meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12h20"></path>
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                          <path d="M10 8V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"></path>
                          <path d="M8 8h8"></path>
                        </svg>
                        {property.baths} Baths
                      </div>
                      <div className="meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                          <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                        {property.sqft} sqft
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h2>PremiumEstates</h2>
              <p>Your trusted partner in finding the most exclusive properties in Jos and Abuja.</p>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} PremiumEstates. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
