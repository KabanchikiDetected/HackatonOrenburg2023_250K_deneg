import React from 'react';
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


function App() {
  return (
    <div className="wrapper">
      <Header/>

        <div className="container">
        <Routes>
          <Route index element={<Index />} />
          <Route path="profile" element={<Profile />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="login" element={<Login />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="signup" element={<Signup />} />
          <Route path="support" element={<Support />} />
          <Route path="tariffs" element={<Tariffs />} />
          <Route path="payment" element={<Payment />} />
        </Routes>
        </div>

      <Footer/>
    </div>
  );
}

export default App;
