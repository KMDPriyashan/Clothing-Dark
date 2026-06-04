import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import WelcomePage from './components/WelcomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;