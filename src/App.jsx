import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Careers from './pages/Careers';
import ProtectedRoute from './components/ProtectedRoute';

import NewArrivals from './pages/NewArrivals';
import MyOrders from './pages/MyOrders';
import Lookbook from './pages/Lookbook';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="listing" element={<Listing />} />
        <Route path="lookbook" element={<Lookbook />} />
        <Route path="contact" element={<Contact />} />
        <Route path="items/:id" element={<Details />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="orders" element={<MyOrders />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="careers" element={<Careers />} />
        <Route path="new-arrivals" element={<NewArrivals />} />

      </Route>


    </Routes>
  );
}

export default App;
