import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

// Import your images from assets folder
import largeImage from '../assets/Large.png'
import smallImage1 from '../assets/Small01.png'
import smallImage2 from '../assets/Small02.png'
import heroBackground from '../assets/hero.png'

import '../components_CSS/WelcomePage.css'

const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="welcome-container">
      <Navbar />

      {/* Hero Section - Left Aligned */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge">PREMIUM COLLECTION 2024</div>
            <h1 className="brand-name">CLOTHING<span>&nbsp;-&nbsp;DARK </span></h1>
            <p className="brand-description">
              Experience the epitome of elegance with our premium black collection.
              Crafted from the finest materials for the perfect blend of comfort and style.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>100% Organic Cotton</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>Free Shipping Island</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>30-Day Easy Returns</span>
              </div>
            </div>
            <div className="cta-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/signup')}
              >
                Shop Now →
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Hero Images - New Layout with your images */}
        <div className="hero-images-layout">
          {/* Large Image on the right */}
          <div className="large-image-container">
            <div className="image-card large-image-card">
              <div className="image-wrapper">
                <img
                  src={largeImage}
                  alt="Premium Black Collection"
                  className="hero-img large-img"
                />

              </div>
            </div>
          </div>

          {/* Small Images Stack */}
          <div className="small-images-stack">
            <div className="image-card small-image-card">
              <div className="image-wrapper">
                <img
                  src={smallImage1}
                  alt="Classic Black Tee"
                  className="hero-img small1-img"
                />

              </div>
            </div>
            <div className="image-card small-image-card">
              <div className="image-wrapper">
                <img
                  src={smallImage2}
                  alt="Modern Fit Shirt"
                  className="hero-img small2-img"
                />

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div id="products" className="featured-section">
        <div className="section-header">
          <h2>Our Best Sellers</h2>
          <p>Discover the most loved pieces from our collection</p>
        </div>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
              <img
                src={smallImage1}
                alt="Classic Black T-Shirt"
              />
              <div className="product-overlay">
                <button className="quick-view">Quick View</button>
              </div>
            </div>
            <div className="product-info">
              <h3>Classic Black T-Shirt</h3>
              <p>Essential everyday wear, ultra-comfortable</p>
              <div className="price">$29.99</div>
              <button className="add-to-cart" onClick={() => navigate('/signup')}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img
                src={smallImage2}
                alt="Formal Black Shirt"
              />
              <div className="product-overlay">
                <button className="quick-view">Quick View</button>
              </div>
            </div>
            <div className="product-info">
              <h3>Formal Black Shirt</h3>
              <p>Perfect for office and special occasions</p>
              <div className="price">$49.99</div>
              <button className="add-to-cart" onClick={() => navigate('/signup')}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img
                src={smallImage2}
                alt="Formal Black Shirt"
              />
              <div className="product-overlay">
                <button className="quick-view">Quick View</button>
              </div>
            </div>
            <div className="product-info">
              <h3>Formal Black Shirt</h3>
              <p>Perfect for office and special occasions</p>
              <div className="price">$49.99</div>
              <button className="add-to-cart" onClick={() => navigate('/signup')}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img
                src={largeImage}
                alt="Premium Black Tee"
              />
              <div className="product-overlay">
                <button className="quick-view">Quick View</button>
              </div>
            </div>
            <div className="product-info">
              <h3>Premium Black Tee</h3>
              <p>Luxury cotton, premium quality feel</p>
              <div className="price">$39.99</div>
              <button className="add-to-cart" onClick={() => navigate('/signup')}>
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div id="features" className="why-choose-us">
        <div className="section-header">
          <h2>Why Choose CLOTHING-DARK?</h2>
          <p>We redefine black fashion with quality and style</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Premium Quality</h3>
            <p>100% combed cotton, pre-shrunk fabric that lasts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Perfect Fit</h3>
            <p>Tailored designs that complement every body type</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Free express shipping on orders over $50</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Sustainable</h3>
            <p>Eco-friendly packaging and ethical sourcing</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div id="contact" className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay in Style</h2>
          <p>Subscribe to get exclusive offers and new collection updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CLOTHING-DARK</h3>
            <p>Premium black clothing for the modern individual</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Size Guide</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Policies</h4>
            <ul>
              <li>Shipping Policy</li>
              <li>Return Policy</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>Twitter</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CLOTHING-DARK. All rights reserved. | Embrace the Darkness</p>
        </div>
      </footer>
    </div>
  )
}

export default WelcomePage