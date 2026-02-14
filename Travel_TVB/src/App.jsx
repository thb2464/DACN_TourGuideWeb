// src/App.jsx

import React from 'react';
// 1. Import useLocation and AnimatePresence
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; 

import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/Layout/ScrollToTop/ScrollToTop.jsx';
import Home_Navbar from './components/Layout/Navbar/Home-Navbar';
import Newsletter from './components/Layout/Newsletter/Newsletter';
import ScrollToTopButton from './components/Layout/ScrollToTopButton/ScrollToTopButton.jsx';
import Footer from './components/Layout/Footer/Footer.jsx';

// 2. Import our new PageLayout wrapper
import PageLayout from './components/PageLayout/PageLayout.jsx'; 

// 3. Import all your pages
import Home from './page/Home/Home';
import AboutUs from './page/AboutUS/AboutUs';
import Service from './page/Service/Service.jsx';
import Contact from './page/Contact/Contact.jsx';
import IndividualService from './page/Individual-Service/Individual-Service.jsx';
import IndividualPost from './page/Individual-Post/Individual-Post.jsx';
import News from './page/News/News.jsx';
import Community from './page/Community/Community.jsx';
import IndividualCommunityPost from './page/Individual-CommunityPost/Individual-CommunityPost.jsx';

import './App.css';

/**
 * 4. Create an `AppContent` component.
 * We must do this so that `useLocation` is *inside* the <Router>.
 */
function AppContent() {
  const location = useLocation();

  return (
    <LanguageProvider>
      <ScrollToTop /> {/* This MUST be outside AnimatePresence */}
      <div className="App minimal-scrollbar">
        <Home_Navbar />
        <main className="main-content">
          {/* 5. Wrap your <Routes> with <AnimatePresence> */}
          <AnimatePresence mode="wait"> 
            <Routes location={location} key={location.pathname}>
              {/* 6. Wrap every single page with <PageLayout> */}
              <Route path="/" element={<PageLayout><Home /></PageLayout>} />
              <Route path="/about" element={<PageLayout><AboutUs /></PageLayout>} />
              <Route path="/service" element={<PageLayout><Service /></PageLayout>} />
              <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
              <Route path="/news" element={<PageLayout><News /></PageLayout>} />
              <Route path="/community" element={<PageLayout><Community /></PageLayout>} />
              <Route path="/service/:slug" element={<PageLayout><IndividualService /></PageLayout>} />
              <Route path="/news/:slug" element={<PageLayout><IndividualPost /></PageLayout>} />
              <Route path="/community/:slug" element={<PageLayout><IndividualCommunityPost /></PageLayout>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Newsletter />
        <Footer />
        <ScrollToTopButton />
      </div>
    </LanguageProvider>
  );
}

/**
 * 7. Your main App component now just provides the Router
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;