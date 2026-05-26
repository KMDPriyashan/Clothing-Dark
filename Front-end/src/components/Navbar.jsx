import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../components_CSS/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Set active link based on current path
  useEffect(() => {
    const path = location.pathname
    if (path === '/') setActiveLink('home')
    else if (path === '/shop') setActiveLink('shop')
    else if (path === '/about') setActiveLink('about')
    else if (path === '/contact') setActiveLink('contact')
  }, [location])

  const handleNavClick = (link, path) => {
    setActiveLink(link)
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate(path)
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo" onClick={() => handleNavClick('home', '/')}>
            <span className="logo-text">CLOTHING</span>
            <span className="logo-dark">-DARK</span>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <ul className="nav-links">
              <li>
                <a 
                  href="#" 
                  className={activeLink === 'home' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('home', '/')
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#products" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('products')
                  }}
                >
                  Shop
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('features')
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('about')
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('contact')
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="navbar-auth">
            <button 
              className="auth-btn login-btn"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
            <button 
              className="auth-btn signup-btn"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div 
            className={`mobile-menu-icon ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            <li>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('home', '/')
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#products" 
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('products')
                }}
              >
                Shop
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('features')
                }}
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('contact')
                }}
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="mobile-auth">
            <button 
              className="auth-btn login-btn"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
            <button 
              className="auth-btn signup-btn"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="navbar-spacer"></div>
    </>
  )
}

export default Navbar