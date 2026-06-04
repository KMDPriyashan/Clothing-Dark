import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db, storage, updateUserProfileData } from '../config/firebase';
import { doc, getDoc, setDoc, collection, addDoc, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '../components/Navbar';
import '../pages_CSS/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signout, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Sri Lanka',
    bio: '',
    photoURL: ''
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Feedback state
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  
  // Order history state
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Load user data from Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfileData({
              name: userData.name || user.displayName || '',
              email: user.email || '',
              phone: userData.phone || '',
              address: userData.address || '',
              city: userData.city || '',
              postalCode: userData.postalCode || '',
              country: userData.country || 'Sri Lanka',
              bio: userData.bio || '',
              photoURL: userData.photoURL || user.photoURL || ''
            });
            if (userData.photoURL) {
              setImagePreview(userData.photoURL);
            }
          } else {
            setProfileData({
              name: user.displayName || '',
              email: user.email || '',
              phone: '',
              address: '',
              city: '',
              postalCode: '',
              country: 'Sri Lanka',
              bio: '',
              photoURL: user.photoURL || ''
            });
            if (user.photoURL) {
              setImagePreview(user.photoURL);
            }
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
    };
    
    loadUserData();
  }, [user]);

  // Load orders from Firestore or localStorage
  useEffect(() => {
    const loadOrders = async () => {
      setLoadingOrders(true);
      
      if (user) {
        // Try to load from Firestore
        try {
          const ordersQuery = query(
            collection(db, 'orders'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
          );
          const ordersSnapshot = await getDocs(ordersQuery);
          const ordersData = ordersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          if (ordersData.length > 0) {
            setOrders(ordersData);
            setLoadingOrders(false);
            return;
          }
        } catch (error) {
          console.error('Error loading orders from Firestore:', error);
        }
      }
      
      // Fallback to localStorage
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      }
      
      setLoadingOrders(false);
    };
    
    loadOrders();
  }, [user]);

  // Load feedback from Firestore
  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const feedbackQuery = query(
          collection(db, 'feedback'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const feedbackSnapshot = await getDocs(feedbackQuery);
        const loadedFeedback = feedbackSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeedbackList(loadedFeedback);
      } catch (error) {
        console.error('Error loading feedback:', error);
      }
    };
    
    loadFeedback();
  }, []);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingImage(true);
      try {
        const imageRef = ref(storage, `profile_images/${user.uid}/${Date.now()}_${file.name}`);
        await uploadBytes(imageRef, file);
        const photoURL = await getDownloadURL(imageRef);
        
        setProfileImage(photoURL);
        setImagePreview(URL.createObjectURL(file));
        setProfileData({ ...profileData, photoURL });
        
        setMessage({ type: 'success', text: 'Image uploaded successfully! Save your profile to update.' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } catch (error) {
        console.error('Error uploading image:', error);
        setMessage({ type: 'error', text: 'Failed to upload image' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } finally {
        setUploadingImage(false);
      }
    }
  };

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
      // Update Firebase Auth display name
      if (profileData.name !== user.displayName) {
        await updateUserProfileData(user, { displayName: profileData.name });
      }
      
      // Save to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        name: profileData.name,
        phone: profileData.phone,
        address: profileData.address,
        city: profileData.city,
        postalCode: profileData.postalCode,
        country: profileData.country,
        bio: profileData.bio,
        photoURL: profileData.photoURL || profileImage,
        email: user.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
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

  // Submit feedback
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setMessage({ type: 'error', text: 'Please enter your feedback' });
      return;
    }
    
    setSubmittingFeedback(true);
    try {
      const newFeedbackData = {
        userId: user.uid,
        userName: profileData.name || user.displayName || 'Anonymous',
        userEmail: user.email,
        feedback: feedback,
        createdAt: new Date().toISOString(),
        rating: 5
      };
      
      await addDoc(collection(db, 'feedback'), newFeedbackData);
      setMessage({ type: 'success', text: 'Thank you for your feedback!' });
      setFeedback('');
      
      // Refresh feedback list
      const feedbackQuery = query(
        collection(db, 'feedback'),
        orderBy('createdAt', 'desc'),
        limit(3)
      );
      const feedbackSnapshot = await getDocs(feedbackQuery);
      const loadedFeedback = feedbackSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeedbackList(loadedFeedback);
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage({ type: 'error', text: 'Failed to submit feedback' });
    } finally {
      setSubmittingFeedback(false);
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="profile-container">
      <Navbar />
      
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="avatar-image" />
            ) : (
              <span className="avatar-initial">
                {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
              </span>
            )}
            <label className="upload-image-btn">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <span className="upload-icon">📷</span>
            </label>
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
              className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
              onClick={() => setActiveTab('feedback')}
            >
              💬 Feedback
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
              {loadingOrders ? (
                <div className="loading-orders">
                  <p>Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-orders">
                  <p>No orders yet.</p>
                  <button className="shop-now-btn" onClick={() => navigate('/shop')}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id || order.orderId} className="order-card">
                      <div className="order-header">
                        <div>
                          <span className="order-id">Order #{order.orderId || order.id}</span>
                          <span className="order-date">{formatDate(order.date || order.createdAt)}</span>
                        </div>
                        {getStatusBadge(order.status || 'Processing')}
                      </div>
                      
                      <div className="order-items">
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} className="order-item">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-footer">
                        <div className="order-total">
                          <strong>Total: ${(order.total || order.totalPrice).toFixed(2)}</strong>
                        </div>
                        <button className="view-order-btn" onClick={() => alert(`Order Details:\nOrder ID: ${order.orderId || order.id}\nStatus: ${order.status || 'Processing'}\nTotal: $${(order.total || order.totalPrice).toFixed(2)}`)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="profile-card">
              <h2>Customer Feedback</h2>
              
              {/* Submit Feedback Form */}
              <div className="feedback-form-container">
                <h3>Share Your Experience</h3>
                <form onSubmit={handleSubmitFeedback} className="feedback-form">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about your experience with CLOTHING-DARK..."
                    rows="4"
                    required
                  />
                  <button type="submit" className="submit-feedback-btn" disabled={submittingFeedback}>
                    {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </form>
              </div>

              {/* Recent Feedback */}
              <div className="recent-feedback">
                <h3>Recent Reviews</h3>
                {feedbackList.length === 0 ? (
                  <p className="no-feedback">No feedback yet. Be the first to share!</p>
                ) : (
                  <div className="feedback-list">
                    {feedbackList.map((item) => (
                      <div key={item.id} className="feedback-item">
                        <div className="feedback-header">
                          <strong className="feedback-user">{item.userName}</strong>
                          <span className="feedback-date">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="feedback-text">{item.feedback}</p>
                        <div className="feedback-rating">
                          {'★'.repeat(item.rating || 5)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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