import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Artists from './pages/Artists';
import Contact from './pages/Contact';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-white selection:bg-electric-500 selection:text-white flex flex-col">
        <Navbar />
        <main className="relative z-0 flex-grow">
            <AnimatedRoutes />
        </main>
        <Footer />
        
        {/* Global ambient glow effects for aesthetics */}
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-electric-500/10 rounded-full blur-[120px] pointer-events-none -z-10 translate-y-1/2 -translate-x-1/2"></div>
        <div className="fixed top-0 right-0 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none -z-10 -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </HashRouter>
  );
};

export default App;