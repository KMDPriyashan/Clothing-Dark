import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import '../components_CSS/Navbar.css'

const Navbar = () => {
  const { user, signout, isAuthenticated } = useAuth()
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

  // Get user display name (first letter of email or "U")
  const getUserInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }

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

  const goToFeatures = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/features'
  }

  const goToAbout = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/about'
  }

  const goToContact = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/contact'
  }

  const goToLogin = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/login'
  }

  const goToSignup = () => {
    setIsMobileMenuOpen(false)
    window.location.href = '/signup'
  }

  const handleSignOut = async () => {
    try {
      await signout()
      setIsMobileMenuOpen(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
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
                <a href="/features" onClick={(e) => { e.preventDefault(); goToFeatures(); }}>
                  Features
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); goToAbout(); }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); goToContact(); }}>
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
            
            {isAuthenticated ? (
              <>
                <div className="user-dropdown">
                  <button className="user-avatar-btn">
                    <span className="user-avatar">{getUserInitial()}</span>
                  </button>
                  <div className="dropdown-menu">
                    <div className="dropdown-item user-info">
                      <span className="dropdown-user-icon">👤</span>
                      <div>
                        <div className="dropdown-user-name">Welcome!</div>
                        <div className="dropdown-user-email">{user?.email}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-item" onClick={handleSignOut}>
                      <span className="dropdown-icon">🚪</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className="auth-btn login-btn" onClick={goToLogin}>
                  Sign In
                </button>
                <button className="auth-btn signup-btn" onClick={goToSignup}>
                  Get Started
                </button>
              </>
            )}
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
            <li><a href="/features" onClick={(e) => { e.preventDefault(); goToFeatures(); }}>Features</a></li>
            <li><a href="/about" onClick={(e) => { e.preventDefault(); goToAbout(); }}>About Us</a></li>
            <li><a href="/contact" onClick={(e) => { e.preventDefault(); goToContact(); }}>Contact</a></li>
          </ul>
          <div className="mobile-auth">
            {isAuthenticated ? (
              <>
                <div className="mobile-user-info">
                  <div className="mobile-user-avatar">{getUserInitial()}</div>
                  <div className="mobile-user-details">
                    <div className="mobile-user-name">Welcome back!</div>
                    <div className="mobile-user-email">{user?.email}</div>
                  </div>
                </div>
                <button className="auth-btn logout-btn mobile-logout" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button className="auth-btn login-btn" onClick={goToLogin}>Sign In</button>
                <button className="auth-btn signup-btn" onClick={goToSignup}>Get Started</button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="navbar-spacer"></div>
    </>
  )
}

export default Navbar