import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../pages_CSS/Shop.css'

// Import local images
import largeImage from '../assets/Large.png'
import smallImage1 from '../assets/Small01.png'
import smallImage2 from '../assets/Small02.png'

const Shop = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  // Product Data with local images
  const products = [
    {
      id: 1,
      name: 'Classic Black T-Shirt',
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.5,
      reviews: 128,
      description: 'Essential everyday wear made from 100% organic cotton. Ultra-comfortable and breathable fabric perfect for daily use.',
      features: ['100% Cotton', 'Breathable', 'Regular Fit', 'Machine Wash'],
      image: smallImage1,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
      discount: 40
    },
    {
      id: 2,
      name: 'Premium Black Tee',
      price: 39.99,
      originalPrice: 69.99,
      rating: 4.8,
      reviews: 245,
      description: 'Luxury cotton t-shirt with premium quality feel. Soft, durable, and designed for maximum comfort.',
      features: ['Premium Cotton', 'Soft Touch', 'Modern Fit', 'Eco-Friendly'],
      image: smallImage2,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      discount: 43
    },
    {
      id: 3,
      name: 'Formal Black Shirt',
      price: 49.99,
      originalPrice: 89.99,
      rating: 4.7,
      reviews: 189,
      description: 'Perfect for office and special occasions. Crisp, elegant, and professionally tailored for the perfect fit.',
      features: ['Wrinkle-Free', 'Professional Look', 'Breathable', 'Easy Iron'],
      image: largeImage,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
      discount: 44
    },
    {
      id: 4,
      name: 'Slim Fit Black Shirt',
      price: 54.99,
      originalPrice: 79.99,
      rating: 4.6,
      reviews: 167,
      description: 'Modern slim fit shirt that hugs your body perfectly. Ideal for parties and casual events.',
      features: ['Slim Fit', 'Stretchy Fabric', 'Modern Design', 'Lightweight'],
      image: smallImage1,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      discount: 31
    },
    {
      id: 5,
      name: 'Oversized Black Tee',
      price: 34.99,
      originalPrice: 59.99,
      rating: 4.4,
      reviews: 98,
      description: 'Trendy oversized fit for a relaxed, streetwear look. Perfect for casual outings.',
      features: ['Oversized Fit', 'Streetwear Style', 'Heavy Cotton', 'Trendy'],
      image: smallImage2,
      sizes: ['M', 'L', 'XL', 'XXL'],
      inStock: true,
      discount: 42
    },
    {
      id: 6,
      name: 'V-Neck Black T-Shirt',
      price: 32.99,
      originalPrice: 54.99,
      rating: 4.5,
      reviews: 156,
      description: 'Elegant V-neck design that adds a touch of sophistication to your casual wear.',
      features: ['V-Neck', 'Soft Cotton', 'Casual Style', 'Breathable'],
      image: largeImage,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: false,
      discount: 40
    }
  ]

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  const addToCart = (product) => {
    if (!selectedSize && selectedProduct) {
      alert('Please select a size')
      return
    }
    
    const cartItem = {
      ...product,
      quantity: selectedProduct ? quantity : 1,
      selectedSize: selectedProduct ? selectedSize : 'M'
    }
    
    setCart([...cart, cartItem])
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
    
    // Show success message
    alert(`${product.name} added to cart!`)
  }

  const quickView = (product) => {
    setSelectedProduct(product)
    setSelectedSize('')
    setQuantity(1)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="shop-container">
      <Navbar />
      
      {/* Shop Hero Section */}
      <div className="shop-hero">
        <div className="shop-hero-content">
          <h1 className="shop-hero-title">Our Black Collection</h1>
          <p className="shop-hero-subtitle">Discover the perfect blend of style and comfort</p>
          <div className="shop-hero-stats">
            <div className="stat">
              <span className="stat-number">{products.length}</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Organic Cotton</span>
            </div>
            <div className="stat">
              <span className="stat-number">Free</span>
              <span className="stat-label">Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="notification">
          Item added to cart successfully!
        </div>
      )}

      {/* Products Grid */}
      <div className="products-section">
        <div className="section-header">
          <h2>Shop All Products</h2>
          <p>Premium quality black clothing for every occasion</p>
        </div>
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.discount > 0 && (
                <div className="discount-badge">-{product.discount}%</div>
              )}
              {!product.inStock && (
                <div className="soldout-badge">Out of Stock</div>
              )}
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <button 
                    className="quick-view-btn"
                    onClick={() => quickView(product)}
                  >
                    Quick View
                  </button>
                </div>
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  <span className="stars">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </span>
                  <span className="reviews">({product.reviews})</span>
                </div>
                <p className="product-description">{product.description.substring(0, 80)}...</p>
                <div className="product-price">
                  <span className="current-price">${product.price}</span>
                  <span className="original-price">${product.originalPrice}</span>
                </div>
                <div className="product-sizes">
                  {product.sizes.map((size) => (
                    <span key={size} className="size-tag">{size}</span>
                  ))}
                </div>
                <button 
                  className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                  onClick={() => product.inStock && addToCart(product)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <div className="modal-rating">
                  <span className="stars">
                    {'★'.repeat(Math.floor(selectedProduct.rating))}
                    {'☆'.repeat(5 - Math.floor(selectedProduct.rating))}
                  </span>
                  <span>{selectedProduct.rating} / 5 ({selectedProduct.reviews} reviews)</span>
                </div>
                <div className="modal-price">
                  <span className="current-price">${selectedProduct.price}</span>
                  <span className="original-price">${selectedProduct.originalPrice}</span>
                </div>
                <p className="modal-description">{selectedProduct.description}</p>
                
                <div className="modal-features">
                  <h4>Features:</h4>
                  <ul>
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-size">
                  <h4>Select Size:</h4>
                  <div className="size-options">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-option ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-quantity">
                  <h4>Quantity:</h4>
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  className="modal-add-to-cart"
                  onClick={() => {
                    if (!selectedSize) {
                      alert('Please select a size')
                      return
                    }
                    addToCart(selectedProduct)
                    closeModal()
                  }}
                >
                  Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="shop-features">
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔄</div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💎</div>
          <h3>Premium Quality</h3>
          <p>100% satisfaction guaranteed</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>
      </div>
    </div>
  )
}

export default Shop