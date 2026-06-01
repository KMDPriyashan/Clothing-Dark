import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../pages_CSS/Features.css'

const Features = () => {
  const [animateItems, setAnimateItems] = useState([])

  useEffect(() => {
    // Add animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight - 100
        if (isVisible) {
          el.classList.add('animated')
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      id: 1,
      icon: '🌿',
      title: '100% Organic Cotton',
      description: 'Our clothing is made from premium organic cotton that is soft, breathable, and gentle on your skin.',
      benefits: ['Hypoallergenic', 'Eco-friendly', 'Sustainable farming'],
      color: '#4caf50'
    },
    {
      id: 2,
      icon: '✨',
      title: 'Premium Quality',
      description: 'Each piece is crafted with attention to detail using the finest materials and manufacturing processes.',
      benefits: ['Long-lasting', 'Color-fast', 'Shrink-resistant'],
      color: '#ff9800'
    },
    {
      id: 3,
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Enjoy free express shipping on all orders over $50. Fast and reliable delivery worldwide.',
      benefits: ['3-5 day delivery', 'Trackable', 'Insured packages'],
      color: '#2196f3'
    },
    {
      id: 4,
      icon: '🔄',
      title: 'Easy Returns',
      description: '30-day hassle-free return policy. If you don\'t love it, we\'ll take it back.',
      benefits: ['Free returns', 'Full refund', 'No questions asked'],
      color: '#9c27b0'
    },
    {
      id: 5,
      icon: '💎',
      title: 'Sustainable Fashion',
      description: 'Committed to ethical manufacturing and sustainable practices that protect our planet.',
      benefits: ['Zero waste', 'Recycled packaging', 'Carbon neutral'],
      color: '#00bcd4'
    },
    {
      id: 6,
      icon: '🔒',
      title: 'Secure Payment',
      description: 'Your transactions are protected with industry-standard SSL encryption.',
      benefits: ['PCI compliant', 'Fraud protection', 'Multiple payment options'],
      color: '#e91e63'
    },
    {
      id: 7,
      icon: '👕',
      title: 'Perfect Fit Guarantee',
      description: 'Detailed size guides and fit recommendations to ensure you get the perfect size.',
      benefits: ['Size calculator', 'Fit experts', 'Exchange policy'],
      color: '#795548'
    },
    {
      id: 8,
      icon: '⭐',
      title: 'Customer Support',
      description: '24/7 dedicated customer support team ready to assist you with any questions.',
      benefits: ['Live chat', 'Email support', 'Phone support'],
      color: '#ffc107'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: '😊' },
    { number: '100%', label: 'Organic Cotton', icon: '🌿' },
    { number: '30K+', label: 'Products Sold', icon: '👕' },
    { number: '4.9', label: 'Customer Rating', icon: '⭐' }
  ]

  const whyChooseUs = [
    {
      title: 'Premium Materials',
      description: 'We source only the highest quality materials for our black collection.',
      image: 'https://images.unsplash.com/photo-1581235725079-7e3f1f1b5b5a?ixlib=rb-4.0.3',
      icon: '🧵'
    },
    {
      title: 'Ethical Manufacturing',
      description: 'Our partners maintain fair wages and safe working conditions.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3',
      icon: '🤝'
    },
    {
      title: 'Quality Control',
      description: 'Every item undergoes rigorous quality checks before shipping.',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3',
      icon: '✅'
    },
    {
      title: 'Eco-Friendly Packaging',
      description: '100% recyclable and biodegradable packaging materials.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3',
      icon: '📦'
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Verified Buyer',
      content: 'The quality of these black t-shirts is incredible! They fit perfectly and the fabric is so soft. Definitely my new go-to brand.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Repeat Customer',
      content: 'Best black shirts I\'ve ever owned. The material doesn\'t fade after washing and the fit is perfect. Highly recommend!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Fashion Blogger',
      content: 'Finally found a brand that specializes in black clothing! The quality and style are unmatched. Love my new shirts!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/3.jpg'
    }
  ]

  return (
    <div className="features-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="features-hero">
        <div className="features-hero-content">
          <h1 className="features-hero-title">Why Choose CLOTHING - DARK ?</h1>
          <p className="features-hero-subtitle">
            Experience the perfect blend of style, comfort, and sustainability
          </p>
          <div className="features-hero-buttons">
            <Link to="/shop" className="hero-btn primary">Shop Now</Link>
            <Link to="/about" className="hero-btn secondary">Learn More</Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card animate-on-scroll">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="main-features">
        <div className="container">
          <div className="section-header">
            <h2>Our Premium Features</h2>
            <p>Discover what makes CLOTHING-DARK the preferred choice for black clothing</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={feature.id} className="feature-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon" style={{ background: `${feature.color}20`, color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="feature-benefits">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i}>
                      <span className="benefit-check">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>We go above and beyond to provide the best experience</p>
          </div>
          
          <div className="why-choose-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-choose-card animate-on-scroll">
                <div className="why-choose-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="sustainability-section">
        <div className="container">
          <div className="sustainability-content">
            <div className="sustainability-text animate-on-scroll">
              <div className="eco-badge">🌱 ECO-FRIENDLY</div>
              <h2>Committed to Sustainability</h2>
              <p>We believe fashion should not come at the cost of our planet. That's why we've made sustainability a core part of our mission.</p>
              <ul className="sustainability-list">
                <li>✓ 100% Organic Cotton</li>
                <li>✓ Plastic-Free Packaging</li>
                <li>✓ Carbon Neutral Shipping</li>
                <li>✓ Ethical Manufacturing</li>
                <li>✓ Water Conservation</li>
              </ul>
              <Link to="/about" className="learn-more-btn">Learn About Our Mission →</Link>
            </div>
            <div className="sustainability-image animate-on-scroll">
              <div className="image-placeholder"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Join thousands of satisfied customers who love our black collection</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="testimonial-card animate-on-scroll">
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Elevate Your Style?</h2>
          <p>Join the CLOTHING-DARK community and experience premium black clothing</p>
          <div className="cta-buttons">
            <Link to="/shop" className="cta-btn primary">Shop Collection</Link>
            <Link to="/signup" className="cta-btn secondary">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features