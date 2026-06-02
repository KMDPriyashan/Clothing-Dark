import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  loginWithEmail, 
  signupWithEmail, 
  loginWithGoogle, 
  logout,
  onAuthChange 
} from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      console.log('Auth state changed:', user?.email || 'No user');
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Sign up with email/password
  const signup = async (email, password) => {
    try {
      const userCredential = await signupWithEmail(email, password);
      console.log('Signup successful:', userCredential.user?.email);
      return userCredential;
    } catch (error) {
      console.error('Signup error:', error.code, error.message);
      throw error;
    }
  };

  // Sign in with email/password
  const signin = async (email, password) => {
    try {
      const userCredential = await loginWithEmail(email, password);
      console.log('Signin successful:', userCredential.user?.email);
      return userCredential;
    } catch (error) {
      console.error('Signin error:', error.code, error.message);
      throw error;
    }
  };

  // Sign in with Google
  const signinWithGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      console.log('Google signin successful:', result.user?.email);
      return result;
    } catch (error) {
      console.error('Google signin error:', error.code, error.message);
      throw error;
    }
  };

  // Sign out
  const signout = async () => {
    try {
      await logout();
      console.log('Signout successful');
    } catch (error) {
      console.error('Signout error:', error);
      throw error;
    }
  };

  // Update user profile (local storage)
  const updateUserProfile = async (userData) => {
    try {
      if (user) {
        if (userData.name) localStorage.setItem('user_name', userData.name);
        if (userData.phone) localStorage.setItem('user_phone', userData.phone);
        if (userData.address) localStorage.setItem('user_address', userData.address);
        if (userData.city) localStorage.setItem('user_city', userData.city);
        if (userData.postalCode) localStorage.setItem('user_postal', userData.postalCode);
        if (userData.country) localStorage.setItem('user_country', userData.country);
        if (userData.bio) localStorage.setItem('user_bio', userData.bio);
        
        console.log('Profile updated successfully');
      }
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Auth value object
  const value = {
    user,
    loading,
    signup,
    signin,
    signinWithGoogle,
    signout,
    updateUserProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;