import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Index from './pages/Index/Index';
import Profile from './pages/Profile/Profile';
import Introduction from './pages/Introduction/Introduction';
import Login from './pages/Login/Login';
import Reviews from './pages/Reviews/Reviews';
import Signup from './pages/Signup/Signup';
import Support from './pages/Support/Support';
import Tariffs from './pages/Tariffs/Tariffs';
import Payment from './pages/Payment/Payment'
import Logout from './pages/Logout/Logout';


function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="wrapper">
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />

      <div className="container">
        <Routes>
          <Route index element={<Index />} />
          <Route path="profile" element={<Profile setIsAuth={setIsAuth} />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="logout" element={<Logout setIsAuth={setIsAuth} />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="signup" element={<Signup setIsAuth={setIsAuth} />} />
          <Route path="support" element={<Support />} />
          <Route path="tariffs" element={<Tariffs />} />
          <Route path="payment" element={<Payment />} />
        </Routes>
      </div>


      <Footer />
    </div>
  );
}

export default App;
