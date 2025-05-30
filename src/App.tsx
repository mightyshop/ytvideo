import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CreatorLayout from './components/CreatorLayout';
import VideoPlayer from './components/VideoPlayer';
import { videos } from './data/videos';
import CountdownTimer from './components/CountdownTimer';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Creator from './pages/Creator';
import Overview from './pages/creator/Overview';
import Analytics from './pages/creator/Analytics';
import Wallet from './pages/creator/Wallet';
import Tools from './pages/creator/Tools';
import SendEmail from './pages/creator/SendEmail';
import Api from './pages/creator/Api';
import BotSend from './pages/creator/tools/BotSend';
import Domains from './pages/creator/tools/Domains';
import Affiliate from './pages/creator/Affiliate';
import Settings from './pages/creator/Settings';
import Dashboard from './pages/business/Dashboard';
import Advertise from './pages/Advertise';
import CreateCampaign from './pages/CreateCampaign';
import Reports from './pages/Reports';
import Seller from './pages/Seller';
import BusinessOrders from './pages/business/Orders';
import BusinessSettings from './pages/business/Settings';
import Customers from './pages/business/Customers';
import EmailMarketing from './pages/business/EmailMarketing';
import Account from './pages/Account';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showEarningMessage, setShowEarningMessage] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setIsMobile(mobileRegex.test(userAgent) || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    let autoPlayTimer: number;
    
    if (autoPlay && isPlaying) {
      autoPlayTimer = window.setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      }, 60000); // Auto advance every 60 seconds
    }

    return () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
      }
    };
  }, [autoPlay, isPlaying]);

  const handleTimerComplete = () => {
    setBalance(prev => prev + 1);
    setShowEarningMessage(true);
    setTimeout(() => {
      setShowEarningMessage(false);
    }, 3000);
  };

  return (
    <Router>
      <Routes>
        {/* Business Routes */}
        <Route path="/business/dashboard" element={<Dashboard />} />
        <Route path="/business/advertise" element={<Advertise />} />
        <Route path="/business/advertise/create" element={<CreateCampaign />} />
        <Route path="/business/reports" element={<Reports />} />
        <Route path="/business/seller" element={<Seller />} />
        <Route path="/business/orders" element={<BusinessOrders />} />
        <Route path="/business/settings" element={<BusinessSettings />} />
        <Route path="/business/customers" element={<Customers />} />
        <Route path="/business/email-marketing" element={<EmailMarketing />} />

        {/* Creator Routes */}
        <Route path="/creator/*" element={
          <CreatorLayout>
            <Routes>
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="affiliate" element={<Affiliate />} />
              <Route path="tools" element={<Tools />} />
              <Route path="tools/sendemail" element={<SendEmail />} />
              <Route path="tools/api" element={<Api />} />
              <Route path="tools/botsend" element={<BotSend />} />
              <Route path="tools/domains" element={<Domains />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </CreatorLayout>
        } />

        {/* Account Route */}
        <Route path="/account" element={<Account />} />

        {/* Main Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/shop" replace />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/cart" element={<Cart />} />
          <Route path="/shop/orders" element={<Orders />} />
          <Route path="/shop/checkout" element={<Checkout />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;