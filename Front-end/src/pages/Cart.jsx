import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../pages_CSS/Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [promoSuccess, setPromoSuccess] = useState('')
  const [removingId, setRemovingId] = useState(null)

  // Load cart from localStorage on component mount
  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCartItems(parsedCart)
    } else {
      setCartItems([])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadCart()
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart()
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('storage', handleCartUpdate)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('storage', handleCartUpdate)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
      window.dispatchEvent(new Event('cartUpdated'))
    }
  }, [cartItems, loading])

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Remove item from cart with animation
  const removeItem = (id) => {
    setRemovingId(id)
    setTimeout(() => {
      setCartItems(prev => prev.filter(item => item.id !== id))
      setRemovingId(null)
    }, 300)
  }

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      setCartItems([])
    }
  }

  // Apply promo code
  const applyPromoCode = () => {
    const validPromos = {
      'SAVE10': 10,
      'SAVE20': 20,
      'DARK30': 30,
      'FREESHIP': 15,
      'WELCOME15': 15
    }
    
    if (validPromos[promoCode.toUpperCase()]) {
      const discountPercent = validPromos[promoCode.toUpperCase()]
      setDiscount(discountPercent)
      setPromoSuccess(`Promo code applied! You saved ${discountPercent}%`)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
      setPromoSuccess('')
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = (subtotal * discount) / 100
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0
  const total = subtotal - discountAmount + shipping

  // Proceed to checkout - Clear cart only after successful checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some items first!')
      return
    }
    
    // Show order confirmation
    const confirmCheckout = window.confirm(
      `Order Summary:\n\n` +
      `Total Items: ${cartItems.length}\n` +
      `Subtotal: $${subtotal.toFixed(2)}\n` +
      `Discount: $${discountAmount.toFixed(2)}\n` +
      `Shipping: ${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}\n` +
      `Total Amount: $${total.toFixed(2)}\n\n` +
      `Click OK to place your order.`
    )
    
    if (confirmCheckout) {
      alert(`Order placed successfully! Total: $${total.toFixed(2)}\n\nThank you for shopping at CLOTHING-DARK!\n\nYour order will be delivered within 3-5 business days.`)
      
      // Clear cart from state
      setCartItems([])
      
      // Clear cart from localStorage
      localStorage.removeItem('cart')
      
      // Dispatch event to update navbar cart count
      window.dispatchEvent(new Event('cartUpdated'))
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  if (loading) {
    return (
      <div className="cart-container">
        <Navbar />
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <Navbar />
      
      {/* Cart Header */}
      <div className="cart-header">
        <h1 className="cart-title">Your Shopping Cart</h1>
        <p className="cart-subtitle">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/shop" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div></div>
            </div>
            
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div 
                  key={`${item.id}-${item.selectedSize}`}
                  className={`cart-item ${removingId === item.id ? 'removing' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="cart-item-product">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-size">Size: {item.selectedSize || 'M'}</p>
                      <p className="cart-item-category">{item.category || 'T-Shirt'}</p>
                    </div>
                  </div>
                  
                  <div className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="cart-item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <div className="cart-item-remove">
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <Link to="/shop" className="continue-shopping-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Promo Code Section */}
            <div className="promo-section">
              <h4>Promo Code</h4>
              <div className="promo-input-group">
                <input 
                  type="text" 
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                />
                <button onClick={applyPromoCode}>Apply</button>
              </div>
              {promoError && <p className="promo-error">{promoError}</p>}
              {promoSuccess && <p className="promo-success">{promoSuccess}</p>}
              <div className="promo-tips">
                <p>✨ Try: SAVE10, SAVE20, DARK30, WELCOME15</p>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            
            {/* Payment Methods */}
            <div className="payment-methods">
              <p>Secure Payment Methods</p>
              <div className="payment-icons">
                <span>💳 Visa</span>
                <span>💳 Mastercard</span>
                <span>💳 PayPal</span>
                <span>💳 Apple Pay</span>
                <span>💳 Google Pay</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart