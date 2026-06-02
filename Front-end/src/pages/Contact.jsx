import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../pages_CSS/Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  })
  const [loading, setLoading] = useState(false)

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you within 24 hours.'
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setLoading(false)
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        })
      }, 5000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['123 Fashion Avenue', 'New York, NY 10001', 'United States']
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      action: 'tel:+15551234567'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: ['support@clothing-dark.com', 'sales@clothing-dark.com'],
      action: 'mailto:support@clothing-dark.com'
    },
    {
      icon: '⏰',
      title: 'Business Hours',
      details: ['Monday - Friday: 9AM - 8PM', 'Saturday: 10AM - 6PM', 'Sunday: Closed']
    }
  ]

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping may take 7-14 business days.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day hassle-free return policy. Items must be unworn, unwashed, and with original tags attached.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email. You can track your order on our website.'
    },
    {
      question: 'What materials do you use?',
      answer: 'We use 100% organic cotton for all our products. Our packaging is eco-friendly and recyclable.'
    },
    {
      question: 'Can I change or cancel my order?',
      answer: 'Orders can be changed or canceled within 1 hour of placing. Please contact support immediately.'
    }
  ]

  return (
    <div className="contact-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Get in Touch</h1>
          <p className="contact-hero-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="contact-info-section">
        <div className="container">
          <div className="info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="info-card animate-on-scroll">
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
                {info.action && (
                  <a href={info.action} className="info-link">
                    Contact Now →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-content animate-on-scroll">
              <div className="section-header">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            <div className="map-content animate-on-scroll">
              <div className="map-placeholder">
                <iframe
                  title="Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb6d04d%3A0xc2c6b6e6f8e8b8b8!2sFashion%20District%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="map-overlay">
                <h3>Visit Our Store</h3>
                <p>123 Fashion Avenue<br />New York, NY 10001</p>
                <Link to="/shop" className="directions-btn">Get Directions →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common questions</p>
          </div>
          
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card animate-on-scroll">
                <div className="faq-question">
                  <span className="faq-icon">❓</span>
                  <h3>{faq.question}</h3>
                </div>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-section">
        <div className="container">
          <div className="social-content">
            <h2>Connect With Us</h2>
            <p>Follow us on social media for updates, promotions, and style inspiration</p>
            <div className="social-links">
              <a href="#" className="social-link instagram">
                <span>📷</span>
                Instagram
              </a>
              <a href="#" className="social-link facebook">
                <span>📘</span>
                Facebook
              </a>
              <a href="#" className="social-link twitter">
                <span>🐦</span>
                Twitter
              </a>
              <a href="#" className="social-link pinterest">
                <span>📌</span>
                Pinterest
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for exclusive offers and new collection alerts</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact