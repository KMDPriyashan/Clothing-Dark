import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import '../pages_CSS/Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [promoSuccess, setPromoSuccess] = useState('')
  const [removingId, setRemovingId] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [processingOrder, setProcessingOrder] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

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
  const updateQuantity = (id, selectedSize, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.selectedSize === selectedSize 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    )
  }

  // Remove item from cart with animation
  const removeItem = (id, selectedSize) => {
    setRemovingId(`${id}-${selectedSize}`)
    setTimeout(() => {
      setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === selectedSize)))
      setRemovingId(null)
    }, 300)
  }

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      setCartItems([])
      localStorage.removeItem('cart')
      localStorage.removeItem('cart_items')
      window.dispatchEvent(new Event('cartUpdated'))
      window.dispatchEvent(new Event('storage'))
      alert('✓ Cart cleared successfully!')
      window.location.reload()
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
      setPromoSuccess(`✓ Promo code applied! You saved ${discountPercent}%`)
      setPromoError('')
      setTimeout(() => setPromoSuccess(''), 3000)
    } else {
      setPromoError('✗ Invalid promo code')
      setPromoSuccess('')
      setTimeout(() => setPromoError(''), 3000)
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = (subtotal * discount) / 100
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0
  const total = subtotal - discountAmount + shipping

  // Open payment modal
  const openPaymentModal = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some items first!')
      return
    }
    setShowPaymentModal(true)
  }

  // Close payment modal
  const closePaymentModal = () => {
    setShowPaymentModal(false)
    setPaymentMethod('')
  }

  // Save order to localStorage
  const saveOrderToLocalStorage = (orderData) => {
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    existingOrders.unshift(orderData)
    localStorage.setItem('orders', JSON.stringify(existingOrders))
    window.dispatchEvent(new Event('ordersUpdated'))
  }

  // Send order notification
  const sendOrderNotification = (orderData) => {
    setOrderSuccess(true)
    
    const notification = document.createElement('div')
    notification.className = 'order-success-notification'
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">✅</span>
        <div>
          <strong>Order Placed Successfully!</strong>
          <p>Order #${orderData.orderId} - Total: $${orderData.total.toFixed(2)}</p>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.classList.add('fade-out')
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 500)
    }, 5000)
  }

  // Process order with payment - FIXED: Properly clears cart items and count
  const processOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }

    setProcessingOrder(true)

    // Prepare order data
    const orderId = 'ORD-' + Date.now()
    const orderData = {
      id: orderId,
      orderId: orderId,
      date: new Date().toLocaleDateString(),
      dateTime: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize,
        category: item.category
      })),
      subtotal: subtotal,
      discount: discount,
      discountAmount: discountAmount,
      shipping: shipping,
      total: total,
      totalPrice: total,
      paymentMethod: paymentMethod,
      status: 'Confirmed',
      promoCodeApplied: promoCode || 'None',
      userName: user?.displayName || localStorage.getItem('user_name') || 'Customer',
      userEmail: user?.email || 'customer@example.com'
    }

    // Save order to localStorage
    saveOrderToLocalStorage(orderData)
    
    // Send notification
    sendOrderNotification(orderData)

    // IMPORTANT: Clear everything before navigation
    // Step 1: Clear cart state
    setCartItems([])
    
    // Step 2: Clear cart from localStorage
    localStorage.removeItem('cart')
    localStorage.removeItem('cart_items')
    
    // Step 3: Dispatch event to update navbar cart count (multiple times to ensure update)
    window.dispatchEvent(new Event('cartUpdated'))
    window.dispatchEvent(new Event('storage'))
    
    // Step 4: Close modal
    closePaymentModal()
    
    // Step 5: Show success message
    alert(`✅ Order Placed Successfully!\n\nOrder ID: ${orderId}\nTotal: $${total.toFixed(2)}\n\nThank you for shopping at CLOTHING-DARK!`)
    
    // Step 6: Set processing to false
    setProcessingOrder(false)
    
    // Step 7: Redirect to home page after a short delay
    setTimeout(() => {
      // Force a final cart update before redirect
      window.dispatchEvent(new Event('cartUpdated'))
      window.location.href = '/'
    }, 500)
  }

  // Handle continue shopping
  const handleContinueShopping = () => {
    window.location.href = '/shop'
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
          <button onClick={handleContinueShopping} className="continue-shopping-btn">
            Continue Shopping
          </button>
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
                  id={`cart-item-${item.id}-${item.selectedSize}`}
                  className={`cart-item ${removingId === `${item.id}-${item.selectedSize}` ? 'removing' : ''}`}
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
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
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
                      onClick={() => removeItem(item.id, item.selectedSize)}
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
              <button onClick={handleContinueShopping} className="continue-shopping-link">
                ← Continue Shopping
              </button>
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
            
            <button className="checkout-btn" onClick={openPaymentModal}>
              Proceed to Checkout
            </button>
            
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={closePaymentModal}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="payment-modal-header">
              <h2>Select Payment Method</h2>
              <button className="modal-close-btn" onClick={closePaymentModal}>×</button>
            </div>
            
            <div className="payment-modal-body">
              <div className="order-summary-mini">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Total Items:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-row">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="payment-options">
                <h3>Payment Methods</h3>
                <label className={`payment-option ${paymentMethod === 'Credit Card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Credit Card"
                    checked={paymentMethod === 'Credit Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">💳</span>
                  <div className="payment-details">
                    <strong>Credit / Debit Card</strong>
                    <small>Visa, Mastercard, Amex, Discover</small>
                  </div>
                </label>
                
                <label className={`payment-option ${paymentMethod === 'PayPal' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">💰</span>
                  <div className="payment-details">
                    <strong>PayPal</strong>
                    <small>Fast and secure checkout</small>
                  </div>
                </label>
                
                <label className={`payment-option ${paymentMethod === 'Apple Pay' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Apple Pay"
                    checked={paymentMethod === 'Apple Pay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">📱</span>
                  <div className="payment-details">
                    <strong>Apple Pay</strong>
                    <small>Pay with your Apple device</small>
                  </div>
                </label>
                
                <label className={`payment-option ${paymentMethod === 'Google Pay' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Google Pay"
                    checked={paymentMethod === 'Google Pay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">🤖</span>
                  <div className="payment-details">
                    <strong>Google Pay</strong>
                    <small>Quick and easy checkout</small>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="payment-modal-footer">
              <button className="cancel-btn" onClick={closePaymentModal}>
                Cancel
              </button>
              <button 
                className="confirm-btn" 
                onClick={processOrder}
                disabled={!paymentMethod || processingOrder}
              >
                {processingOrder ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart