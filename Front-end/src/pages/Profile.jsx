import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import '../pages_CSS/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signout, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Sri Lanka',
    bio: ''
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Order history (mock data - replace with API call)
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 129.99,
      status: 'Delivered',
      items: [
        { name: 'Classic Black T-Shirt', quantity: 2, price: 29.99 },
        { name: 'Premium Black Tee', quantity: 1, price: 39.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-02-20',
      total: 89.99,
      status: 'Shipped',
      items: [
        { name: 'Formal Black Shirt', quantity: 1, price: 49.99 },
        { name: 'Slim Fit Black Shirt', quantity: 1, price: 39.99 }
      ]
    }
  ]);

  // Load user data from localStorage and Firebase
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.displayName || localStorage.getItem('user_name') || '',
        email: user.email || '',
        phone: localStorage.getItem('user_phone') || '',
        address: localStorage.getItem('user_address') || '',
        city: localStorage.getItem('user_city') || '',
        postalCode: localStorage.getItem('user_postal') || '',
        country: localStorage.getItem('user_country') || 'Sri Lanka',
        bio: localStorage.getItem('user_bio') || ''
      });
    }
  }, [user]);

  // If not authenticated, redirect to login
  // But wait for auth to finish loading first
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render the profile content
  if (!isAuthenticated) {
    return null;
  }

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Save to localStorage
      localStorage.setItem('user_name', profileData.name);
      localStorage.setItem('user_phone', profileData.phone);
      localStorage.setItem('user_address', profileData.address);
      localStorage.setItem('user_city', profileData.city);
      localStorage.setItem('user_postal', profileData.postalCode);
      localStorage.setItem('user_country', profileData.country);
      localStorage.setItem('user_bio', profileData.bio);
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Mock password update
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signout();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Delivered':
        return <span className="status-badge delivered">✓ Delivered</span>;
      case 'Shipped':
        return <span className="status-badge shipped">🚚 Shipped</span>;
      case 'Processing':
        return <span className="status-badge processing">⚙️ Processing</span>;
      default:
        return <span className="status-badge pending">⏳ Pending</span>;
    }
  };

  return (
    <div className="profile-container">
      <Navbar />
      
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            <span className="avatar-initial">
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <h1>My Profile</h1>
          <p>Manage your account information and orders</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="user-info-card">
            <div className="user-name">{profileData.name || 'User'}</div>
            <div className="user-email">{user?.email}</div>
            <button className="signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
          
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              📝 Profile Information
            </button>
            <button 
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Order History
            </button>
            <button 
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              🔒 Security
            </button>
          </div>
        </div>

        <div className="profile-main">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
            <div className="profile-card">
              <h2>Profile Information</h2>
              <form onSubmit={updateProfile} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      disabled
                      className="disabled-input"
                    />
                    <small>Email cannot be changed</small>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      placeholder="Tell us about yourself"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      placeholder="Street address"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      placeholder="City"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={profileData.postalCode}
                      onChange={handleProfileChange}
                      placeholder="Postal code"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Country</label>
                    <select
                      name="country"
                      value={profileData.country}
                      onChange={handleProfileChange}
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Sri Lanka</option>
                      <option>India</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Order History Tab */}
          {activeTab === 'orders' && (
            <div className="profile-card">
              <h2>Order History</h2>
              {orders.length === 0 ? (
                <div className="empty-orders">
                  <p>No orders yet.</p>
                  <button className="shop-now-btn" onClick={() => navigate('/shop')}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div>
                          <span className="order-id">Order #{order.id}</span>
                          <span className="order-date">{order.date}</span>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      
                      <div className="order-items">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-footer">
                        <div className="order-total">
                          <strong>Total: ${order.total.toFixed(2)}</strong>
                        </div>
                        <button className="view-order-btn">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="profile-card">
              <h2>Change Password</h2>
              <form onSubmit={updatePassword} className="profile-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password (min 6 characters)"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>

              <div className="security-info">
                <h3>Account Security Tips</h3>
                <ul>
                  <li>✓ Use a strong, unique password</li>
                  <li>✓ Never share your password with anyone</li>
                  <li>✓ Enable two-factor authentication for extra security</li>
                  <li>✓ Regularly review your account activity</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;