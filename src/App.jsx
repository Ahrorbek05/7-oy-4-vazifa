import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import Header from './components/Header';
import Details from './pages/Details';
import Cards from './pages/Cards';
import { CartProvider } from './components/CartContext';

export const TokenContext = createContext('');
export const UserContext = createContext('');

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [filters, setFilters] = useState({ search: '', category: 'all', company: '', sort: '', price: 0 });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <CartProvider>
          <Routes>
            <Route path='/header' element={<Header></ Header >} />
            <Route path='/' element={<MainLayout><Home /></MainLayout>} />
            <Route path='/about' element={<MainLayout><About /></MainLayout>} />
            <Route path='/details/:id' element={<MainLayout><Details /></MainLayout>} />
            <Route path='/product/:id' element={<MainLayout><Products /></MainLayout>} />
            <Route path='/cart' element={<MainLayout><Cart /></MainLayout>} />
            <Route path='/cards' element={
              <MainLayout>
                <Products onFilterChange={handleFilterChange} />
                <Cards filters={filters} />
              </MainLayout>
            } />
            {token && <>
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/orders' element={<Orders />} />
            </>}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </CartProvider>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
