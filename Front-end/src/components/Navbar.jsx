import React, { useState, useEffect } from 'react'
import '../components_CSS/Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

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

  // Get cart count from localStorage
  const updateCartCount = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalItems)
    } else {
      setCartCount(0)
    }
  }

  // Update current path when URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  // Load cart count on mount and listen for updates
  useEffect(() => {
    updateCartCount()
    window.addEventListener('storage', updateCartCount)
    window.addEventListener('cartUpdated', updateCartCount)
    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  // Navigation functions using direct browser navigation
  const goToHome = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/'
  }

  const goToShop = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/shop'
  }

  const goToCart = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/cart'
  }

  const goToLogin = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/login'
  }

  const goToSignup = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/signup'
  }

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false)
    if (currentPath !== '/') {
      window.location.href = '/'
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }, 200)
    } else {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo" onClick={goToHome}>
            <span className="logo-text">CLOTHING</span>
            <span className="logo-dark">-DARK</span>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <ul className="nav-links">
              <li>
                <a href="/" onClick={(e) => { e.preventDefault(); goToHome(); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" onClick={(e) => { e.preventDefault(); goToShop(); }}>
                  Shop
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
                  Features
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Auth Buttons and Cart */}
          <div className="navbar-auth">
            <button className="auth-btn cart-btn" onClick={goToCart}>
              🛒 Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className="auth-btn login-btn" onClick={goToLogin}>
              Sign In
            </button>
            <button className="auth-btn signup-btn" onClick={goToSignup}>
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
            <li><a href="/" onClick={(e) => { e.preventDefault(); goToHome(); }}>Home</a></li>
            <li><a href="/shop" onClick={(e) => { e.preventDefault(); goToShop(); }}>Shop</a></li>
            <li><a href="/cart" onClick={(e) => { e.preventDefault(); goToCart(); }}>Cart {cartCount > 0 && `(${cartCount})`}</a></li>
            <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
          <div className="mobile-auth">
            <button className="auth-btn login-btn" onClick={goToLogin}>Sign In</button>
            <button className="auth-btn signup-btn" onClick={goToSignup}>Get Started</button>
          </div>
        </div>
      </nav>

      <div className="navbar-spacer"></div>
    </>
  )
}

export default Navbar