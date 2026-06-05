import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { useAuth } from '../contexts/AuthContext'

// Import your images from assets folder
import largeImage from '../assets/Small01.png'
import smallImage1 from '../assets/Small01.png'
import smallImage2 from '../assets/Small02.png'
import heroBackground from '../assets/hero.png'

import '../components_CSS/WelcomePage.css'

const WelcomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // Handle shop navigation with auth check
  const handleShopNavigation = () => {
    if (isAuthenticated) {
      navigate('/shop')
    } else {
      navigate('/login')
    }
  }

  // Handle quick view navigation
  const handleQuickView = () => {
    navigate('/shop')
  }

  // Handle shop now button
  const handleShopNow = () => {
    navigate('/login')
  }

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
                <span>Free Shipping Worldwide</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✓</span>
                <span>30-Day Easy Returns</span>
              </div>
            </div>
            <div className="cta-buttons">
              <button
                className="btn btn-primary"
                onClick={handleShopNow}
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

      {/* Featured Products Section - Best Sellers */}
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
                <button className="quick-view" onClick={handleQuickView}>
                  Quick View
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3>Classic Black T-Shirt</h3>
              <p>Essential everyday wear, ultra-comfortable</p>
              <div className="price">$29.99</div>
              <button className="add-to-cart" onClick={handleShopNow}>
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
                <button className="quick-view" onClick={handleQuickView}>
                  Quick View
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3>Formal Black Shirt</h3>
              <p>Perfect for office and special occasions</p>
              <div className="price">$49.99</div>
              <button className="add-to-cart" onClick={handleShopNow}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img
                src={smallImage2}
                alt="Premium Black Shirt"
              />
              <div className="product-overlay">
                <button className="quick-view" onClick={handleQuickView}>
                  Quick View
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3>Premium Black Shirt</h3>
              <p>Premium quality for sophisticated look</p>
              <div className="price">$59.99</div>
              <button className="add-to-cart" onClick={handleShopNow}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img
                src={largeImage}
                alt="Premium Bagee Black Tee"
              />
              <div className="product-overlay">
                <button className="quick-view" onClick={handleQuickView}>
                  Quick View
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3>Premium Bagee Black Tee</h3>
              <p>Luxury cotton, premium quality feel</p>
              <div className="price">$49.69</div>
              <button className="add-to-cart" onClick={handleShopNow}>
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

      {/* Testimonials Section - Replacing Newsletter */}
      <div className="testimonials-section">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied customers worldwide</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"Absolutely love my new black t-shirt! The quality is amazing and it fits perfectly. Best purchase I've made this year!"</p>
            <div className="testimonial-author">
              <strong>Sarah Johnson</strong>
              <span>Verified Buyer</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"The formal black shirt is outstanding. Perfect for office wear. The fabric is breathable and very comfortable."</p>
            <div className="testimonial-author">
              <strong>Michael Chen</strong>
              <span>Verified Buyer</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"Great customer service and fast shipping. The oversized tee is my new favorite! Will definitely order again."</p>
            <div className="testimonial-author">
              <strong>Emily Rodriguez</strong>
              <span>Verified Buyer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story Section */}
      <div className="brand-story-section">
        <div className="brand-story-content">
          <div className="brand-story-text">
            <div className="story-badge">OUR STORY</div>
            <h2>Inspired by Simplicity, Driven by Quality</h2>
            <p>CLOTHING-DARK was born from a passion for timeless style and uncompromising quality. We believe that black isn't just a color—it's a statement. Every piece in our collection is thoughtfully designed, ethically manufactured, and crafted to last.</p>
            <p>Join thousands of customers who have made the switch to sustainable, premium black clothing that never goes out of style.</p>
            <button className="story-btn" onClick={handleShopNow}>Discover Our Collection →</button>
          </div>
          <div className="brand-story-image">
            <div className="story-image-placeholder"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CLOTHING-DARK</h3>
            <p>Premium black clothing for the modern individual</p>
            <div className="footer-social">
              <span>📷 Instagram</span>
              <span>📘 Facebook</span>
              <span>🐦 Twitter</span>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => navigate('/')}>Home</li>
              <li onClick={() => navigate('/shop')}>Shop</li>
              <li onClick={() => navigate('/features')}>Features</li>
              <li onClick={() => navigate('/about')}>About Us</li>
              <li onClick={() => navigate('/contact')}>Contact</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li>FAQ</li>
              <li>Size Guide</li>
              <li>Track Order</li>
              <li>Returns Policy</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ support@clothing-dark.com</li>
              <li>📍 123 Fashion Avenue, NY</li>
            </ul>
            <div className="payment-icons">
              <span>💳 Visa</span>
              <span>💳 Mastercard</span>
              <span>💳 PayPal</span>
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