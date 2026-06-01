import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../pages_CSS/About.css'

const About = () => {
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

  const teamMembers = [
    {
      id: 1,
      name: 'Alexander Dark',
      role: 'Founder & CEO',
      bio: 'Passionate about minimalistic fashion and sustainable clothing.',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      social: { linkedin: '#', twitter: '#', instagram: '#' }
    },
    {
      id: 2,
      name: 'Sophia Chen',
      role: 'Head of Design',
      bio: 'Former fashion designer at major brands, now creating timeless black pieces.',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      social: { linkedin: '#', twitter: '#', instagram: '#' }
    },
    {
      id: 3,
      name: 'Marcus Williams',
      role: 'Production Manager',
      bio: 'Ensuring every piece meets our highest quality standards.',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      social: { linkedin: '#', twitter: '#', instagram: '#' }
    },
    {
      id: 4,
      name: 'Isabella Rossi',
      role: 'Sustainability Officer',
      bio: 'Committed to making fashion eco-friendly and ethical.',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      social: { linkedin: '#', twitter: '#', instagram: '#' }
    }
  ]

  const milestones = [
    { year: '2020', title: 'The Beginning', description: 'CLOTHING-DARK was founded with a simple vision: create the perfect black clothing.' },
    { year: '2021', title: 'First Collection', description: 'Launched our debut collection of premium black t-shirts and shirts.' },
    { year: '2022', title: 'Sustainable Shift', description: 'Transitioned to 100% organic cotton and eco-friendly packaging.' },
    { year: '2023', title: 'Global Expansion', description: 'Expanded shipping to over 50 countries worldwide.' },
    { year: '2024', title: 'Community Growth', description: 'Reached 50,000+ happy customers and counting!' }
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Quality First',
      description: 'We never compromise on quality. Every piece is crafted with premium materials.'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices from sourcing to shipping.'
    },
    {
      icon: '🤝',
      title: 'Customer Focus',
      description: 'Your satisfaction is our top priority. We\'re here for you 24/7.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Constantly improving our designs and processes for better products.'
    }
  ]

  return (
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">Our Story</h1>
          <p className="about-hero-subtitle">
          From a simple idea to a global brand — redefining black clothing
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text animate-on-scroll">
              <div className="story-badge">WHO WE ARE</div>
              <h2>More Than Just Black Clothing</h2>
              <p>CLOTHING-DARK was born from a simple observation: finding the perfect black clothing shouldn't be complicated. We started with a mission to create high-quality, sustainable black garments that combine timeless style with modern comfort.</p>
              <p>Today, we've grown into a community of fashion enthusiasts who appreciate the elegance and versatility of black. Every piece we create is thoughtfully designed, ethically manufactured, and made to last.</p>
              <p>We believe that fashion should be both beautiful and responsible. That's why we use only the finest organic cotton and maintain transparent, ethical production practices.</p>
              <div className="story-stats">
                <div className="story-stat">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="story-stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Countries</span>
                </div>
                <div className="story-stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Organic Cotton</span>
                </div>
              </div>
            </div>
            <div className="story-image animate-on-scroll">
              <div className="image-placeholder story-img"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>What guides everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card animate-on-scroll">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Journey Timeline */}
      <div className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Milestones that shaped CLOTHING-DARK</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} animate-on-scroll`}>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet the Team</h2>
            <p>The passionate people behind CLOTHING-DARK</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="team-card animate-on-scroll">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
                <div className="team-social">
                  <a href={member.social.linkedin} className="social-link">🔗</a>
                  <a href={member.social.twitter} className="social-link">🐦</a>
                  <a href={member.social.instagram} className="social-link">📷</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sustainability Commitment */}
      <div className="sustainability-commitment">
        <div className="container">
          <div className="commitment-content">
            <div className="commitment-text animate-on-scroll">
              <div className="eco-badge">🌱 OUR COMMITMENT</div>
              <h2>Sustainable Fashion for a Better Future</h2>
              <p>We believe that great style shouldn't come at the cost of our planet. That's why sustainability is at the heart of everything we do.</p>
              <ul className="commitment-list">
                <li>✓ 100% Organic Cotton — No harmful pesticides or chemicals</li>
                <li>✓ Plastic-Free Packaging — 100% recyclable and biodegradable</li>
                <li>✓ Ethical Manufacturing — Fair wages and safe working conditions</li>
                <li>✓ Carbon Neutral Shipping — Offsetting our carbon footprint</li>
                <li>✓ Water Conservation — Using 70% less water in production</li>
              </ul>
            </div>
            <div className="commitment-image animate-on-scroll">
              <div className="image-placeholder sustainability-img"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="about-cta">
        <div className="cta-content">
          <h2>Join the CLOTHING-DARK Community</h2>
          <p>Experience the perfect blend of style, comfort, and sustainability</p>
          <div className="cta-buttons">
            <Link to="/shop" className="cta-btn primary">Shop Collection</Link>
            <Link to="/signup" className="cta-btn secondary">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About