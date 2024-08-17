import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          {
            token && <>
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/orders' element={<Orders />} />
            </>
          }
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
    </div>
  )
}

export default App
