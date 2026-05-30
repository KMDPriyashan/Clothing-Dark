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

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    try {
      const userCredential = await signupWithEmail(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const signin = async (email, password) => {
    try {
      const userCredential = await loginWithEmail(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const signinWithGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const signout = async () => {
    try {
      await logout();
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signup,
    signin,
    signinWithGoogle,
    signout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}