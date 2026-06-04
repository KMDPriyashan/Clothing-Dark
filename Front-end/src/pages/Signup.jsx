import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { sendWelcomeEmail } from '../services/emailService';
import '../pages_CSS/Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, signinWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Step 1: Create user account in Firebase
      console.log('Creating account for:', email);
      const userCredential = await signup(email, password);
      console.log('Account created successfully:', userCredential.user.uid);
      
      // Step 2: Try to send welcome email (don't block signup if fails)
      try {
        const emailResult = await sendWelcomeEmail({ name, email });
        if (emailResult.success) {
          setSuccessMessage('Account created! Welcome email sent to your inbox.');
        } else {
          console.log('Email not sent, but account created successfully');
        }
      } catch (emailError) {
        console.log('Email error (non-critical):', emailError);
      }
      
      // Step 3: Navigate to shop page
      setTimeout(() => {
        navigate('/shop');
      }, 1500);
      
    } catch (err) {
      console.error('Signup error:', err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Email already in use. Please login instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Use at least 6 characters');
          break;
        default:
          setError('Failed to create account. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signinWithGoogle();
      console.log('Google signup successful:', result.user.uid);
      
      const userName = result.user.displayName || result.user.email.split('@')[0];
      
      // Try to send welcome email (don't block)
      try {
        await sendWelcomeEmail({ name: userName, email: result.user.email });
      } catch (emailError) {
        console.log('Email error (non-critical):', emailError);
      }
      
      navigate('/shop');
    } catch (err) {
      console.error('Google signup error:', err);
      setError('Google sign-in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join the dark side of fashion</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 characters)"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="or-divider">
          <span>or</span>
        </div>

        <button 
          onClick={handleGoogleSignIn} 
          className="auth-btn google-btn"
          disabled={loading}
        >
          <span style={{ marginRight: '10px' }}>G</span>
          Sign up with Google
        </button>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;