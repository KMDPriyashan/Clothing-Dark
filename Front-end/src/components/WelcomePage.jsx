import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
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
            <h1 className="brand-name">CLOTHING<span>&nbsp;&nbsp;-&nbsp;&nbsp;DARK </span></h1>
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
        
        {/* Hero Images */}
        <div className="hero-images">
          <div className="image-card image-2">
            <div className="image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Woman in black shirt"
                className="hero-img"
              />
              <div className="image-label">Premium Black Shirt</div>
            </div>
          </div>
          <div className="image-card image-3">
            <div className="image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Model in black outfit"
                className="hero-img"
              />
              <div className="image-label">Modern Fit</div>
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
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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