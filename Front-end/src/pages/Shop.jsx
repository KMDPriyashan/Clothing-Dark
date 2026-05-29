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
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  // Product Data with local images - Expanded Collection
  const products = [
    {
      id: 1,
      name: 'Classic Black T-Shirt',
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.5,
      reviews: 128,
      category: 't-shirt',
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
      category: 't-shirt',
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
      category: 'shirt',
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
      category: 'shirt',
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
      category: 't-shirt',
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
      category: 't-shirt',
      description: 'Elegant V-neck design that adds a touch of sophistication to your casual wear.',
      features: ['V-Neck', 'Soft Cotton', 'Casual Style', 'Breathable'],
      image: largeImage,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: false,
      discount: 40
    },
    {
      id: 7,
      name: 'Crewneck Black Sweatshirt',
      price: 59.99,
      originalPrice: 89.99,
      rating: 4.9,
      reviews: 234,
      category: 'sweatshirt',
      description: 'Cozy crewneck sweatshirt perfect for chilly evenings. Made with premium fleece fabric.',
      features: ['Fleece Lined', 'Crewneck', 'Warm', 'Durable'],
      image: smallImage1,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
      discount: 33
    },
    {
      id: 8,
      name: 'Hooded Black Sweatshirt',
      price: 69.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviews: 312,
      category: 'sweatshirt',
      description: 'Stylish hoodie with adjustable drawstrings. Perfect for streetwear and casual looks.',
      features: ['Adjustable Hood', 'Kangaroo Pocket', 'Soft Fabric', 'Trendy'],
      image: smallImage2,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      discount: 30
    },
    {
      id: 9,
      name: 'Polo Black T-Shirt',
      price: 44.99,
      originalPrice: 69.99,
      rating: 4.6,
      reviews: 178,
      category: 't-shirt',
      description: 'Classic polo design with modern fit. Perfect for semi-formal occasions.',
      features: ['Polo Collar', 'Button Placket', 'Breathable', 'Classic Fit'],
      image: largeImage,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
      discount: 36
    },
    {
      id: 10,
      name: 'Linen Black Shirt',
      price: 64.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 145,
      category: 'shirt',
      description: 'Lightweight linen shirt perfect for summer. Breathable and comfortable all day long.',
      features: ['100% Linen', 'Lightweight', 'Breathable', 'Summer Essential'],
      image: smallImage1,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      discount: 35
    },
    {
      id: 11,
      name: 'Muscle Fit Black Tee',
      price: 36.99,
      originalPrice: 54.99,
      rating: 4.5,
      reviews: 267,
      category: 't-shirt',
      description: 'Designed to accentuate your physique. Perfect for gym and casual wear.',
      features: ['Muscle Fit', 'Stretchy', 'Moisture Wicking', 'Athletic'],
      image: smallImage2,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      discount: 33
    },
    {
      id: 12,
      name: 'Oxford Black Shirt',
      price: 59.99,
      originalPrice: 89.99,
      rating: 4.8,
      reviews: 198,
      category: 'shirt',
      description: 'Premium oxford fabric shirt. Perfect for business casual and formal events.',
      features: ['Oxford Fabric', 'Button Down', 'Wrinkle Resistant', 'Professional'],
      image: largeImage,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
      discount: 33
    },
    {
      id: 13,
      name: 'Raglan Black Tee',
      price: 31.99,
      originalPrice: 49.99,
      rating: 4.4,
      reviews: 89,
      category: 't-shirt',
      description: 'Sporty raglan sleeve design. Perfect for athletic and casual wear.',
      features: ['Raglan Sleeves', 'Sporty Look', 'Comfortable', 'Breathable'],
      image: smallImage1,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      discount: 36
    },
    {
      id: 14,
      name: 'Turtleneck Black Shirt',
      price: 54.99,
      originalPrice: 79.99,
      rating: 4.6,
      reviews: 123,
      category: 'shirt',
      description: 'Elegant turtleneck design. Perfect for sophisticated and trendy looks.',
      features: ['Turtleneck', 'Warm', 'Stylish', 'Stretchy'],
      image: smallImage2,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      discount: 31
    },
    {
      id: 15,
      name: 'Longline Black Tee',
      price: 38.99,
      originalPrice: 59.99,
      rating: 4.5,
      reviews: 156,
      category: 't-shirt',
      description: 'Extended length design for a modern streetwear look. Perfect for layering.',
      features: ['Longline', 'Streetwear Style', 'Soft Fabric', 'Trendy'],
      image: largeImage,
      sizes: ['M', 'L', 'XL', 'XXL'],
      inStock: true,
      discount: 35
    },
    {
      id: 16,
      name: 'Denim Black Shirt',
      price: 74.99,
      originalPrice: 119.99,
      rating: 4.7,
      reviews: 234,
      category: 'shirt',
      description: 'Premium denim shirt with modern fit. Perfect for casual and semi-formal looks.',
      features: ['Denim Fabric', 'Durable', 'Stylish', 'Button Down'],
      image: smallImage1,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      discount: 38
    }
  ]

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...products]
    
    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(product => product.category === filter)
    }
    
    // Apply sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount)
    }
    
    return filtered
  }

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

  const filteredProducts = getFilteredProducts()

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

      {/* Filter and Sort Section */}
      <div className="filter-section">
        <div className="filter-container">
          <div className="filter-group">
            <label>Category:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Products</option>
              <option value="t-shirt">T-Shirts</option>
              <option value="shirt">Shirts</option>
              <option value="sweatshirt">Sweatshirts</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
          
          <div className="results-count">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <div className="section-header">
          <h2>Shop All Products</h2>
          <p>Premium quality black clothing for every occasion</p>
        </div>
        
        <div className="products-grid">
          {filteredProducts.map((product) => (
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
                <div className="product-category">{product.category}</div>
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
                  {product.sizes.slice(0, 4).map((size) => (
                    <span key={size} className="size-tag">{size}</span>
                  ))}
                  {product.sizes.length > 4 && <span className="size-tag">+{product.sizes.length - 4}</span>}
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
                <div className="modal-category">{selectedProduct.category}</div>
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