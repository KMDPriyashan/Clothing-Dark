import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        {/* <Route path="/shop" element={isAuthenticated ? <Shop /> : <WelcomePage />} /> */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App