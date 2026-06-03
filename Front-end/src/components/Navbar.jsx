import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import '../components_CSS/Navbar.css'

const Navbar = () => {
  const { user, signout, isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [activeLink, setActiveLink] = useState('')

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

  // Update current path and active link when URL changes
  useEffect(() => {
    const path = window.location.pathname
    setCurrentPath(path)
    
    // Set active link based on current path
    if (path === '/') {
      setActiveLink('home')
    } else if (path === '/shop') {
      setActiveLink('shop')
    } else if (path === '/cart') {
      setActiveLink('cart')
    } else if (path === '/features') {
      setActiveLink('features')
    } else if (path === '/about') {
      setActiveLink('about')
    } else if (path === '/contact') {
      setActiveLink('contact')
    } else if (path === '/profile') {
      setActiveLink('profile')
    } else if (path === '/login') {
      setActiveLink('login')
    } else if (path === '/signup') {
      setActiveLink('signup')
    } else {
      setActiveLink('')
    }
  }, [window.location.pathname])

  // Listen for popstate events (browser back/forward)
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
    setActiveLink('home')
    setIsMobileMenuOpen(false)
    window.location.href = '/'
  }

  const goToShop = () => {
    setActiveLink('shop')
    setIsMobileMenuOpen(false)
    window.location.href = '/shop'
  }

  const goToCart = () => {
    setActiveLink('cart')
    setIsMobileMenuOpen(false)
    window.location.href = '/cart'
  }

  const goToFeatures = () => {
    setActiveLink('features')
    setIsMobileMenuOpen(false)
    window.location.href = '/features'
  }

  const goToAbout = () => {
    setActiveLink('about')
    setIsMobileMenuOpen(false)
    window.location.href = '/about'
  }

  const goToContact = () => {
    setActiveLink('contact')
    setIsMobileMenuOpen(false)
    window.location.href = '/contact'
  }

  const goToLogin = () => {
    setActiveLink('login')
    setIsMobileMenuOpen(false)
    window.location.href = '/login'
  }

  const goToSignup = () => {
    setActiveLink('signup')
    setIsMobileMenuOpen(false)
    window.location.href = '/signup'
  }

  const goToProfile = () => {
    setActiveLink('profile')
    setIsMobileMenuOpen(false)
    window.location.href = '/profile'
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
                <a 
                  href="/" 
                  className={activeLink === 'home' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); goToHome(); }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/shop" 
                  className={activeLink === 'shop' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); goToShop(); }}
                >
                  Shop
                </a>
              </li>
              <li>
                <a 
                  href="/features" 
                  className={activeLink === 'features' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); goToFeatures(); }}
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className={activeLink === 'about' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); goToAbout(); }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className={activeLink === 'contact' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); goToContact(); }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Auth Buttons and Cart */}
          <div className="navbar-auth">
            <button 
              className={`auth-btn cart-btn ${activeLink === 'cart' ? 'active' : ''}`}
              onClick={goToCart}
            >
              🛒 Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            
            {isAuthenticated ? (
              <>
                <div className="user-dropdown">
                  <button className="user-avatar-btn" onClick={goToProfile}>
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
                    <button className="dropdown-item" onClick={goToProfile}>
                      <span className="dropdown-icon">⚙️</span>
                      Profile Settings
                    </button>
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
                <button 
                  className={`auth-btn login-btn ${activeLink === 'login' ? 'active' : ''}`}
                  onClick={goToLogin}
                >
                  Sign In
                </button>
                <button 
                  className={`auth-btn signup-btn ${activeLink === 'signup' ? 'active' : ''}`}
                  onClick={goToSignup}
                >
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
            <li>
              <a 
                href="/" 
                className={activeLink === 'home' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); goToHome(); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/shop" 
                className={activeLink === 'shop' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); goToShop(); }}
              >
                Shop
              </a>
            </li>
            <li>
              <a 
                href="/cart" 
                className={activeLink === 'cart' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); goToCart(); }}
              >
                Cart {cartCount > 0 && `(${cartCount})`}
              </a>
            </li>
            <li>
              <a 
                href="/features" 
                className={activeLink === 'features' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); goToFeatures(); }}
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className={activeLink === 'about' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); goToAbout(); }}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className={activeLink === 'contact' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); goToContact(); }}
              >
                Contact
              </a>
            </li>
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
                <button 
                  className="auth-btn logout-btn mobile-logout" 
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button 
                  className={`auth-btn login-btn ${activeLink === 'login' ? 'active' : ''}`}
                  onClick={goToLogin}
                >
                  Sign In
                </button>
                <button 
                  className={`auth-btn signup-btn ${activeLink === 'signup' ? 'active' : ''}`}
                  onClick={goToSignup}
                >
                  Get Started
                </button>
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