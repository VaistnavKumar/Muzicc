import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Disc, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Artists', path: '/artists' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-auto transition-all duration-300">
      <div className="backdrop-blur-2xl bg-black/40 border border-white/10 rounded-full px-8 py-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex justify-between items-center md:gap-12 relative overflow-hidden ring-1 ring-white/5 z-50">
        
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group cursor-pointer shrink-0 z-10" onClick={() => setIsOpen(false)}>
          <Disc className="w-6 h-6 text-electric-500 animate-spin-slow group-hover:text-white transition-colors duration-300" />
          <span className="text-lg font-bold tracking-tighter text-white">
            MUZICCC<span className="text-electric-500">.</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 z-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:text-white ${
                  isActive ? 'text-electric-500' : 'text-gray-400'
                }`
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center">
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-glow"
                      className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-electric-500 shadow-[0_0_10px_#ef4444]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-1 z-10 cursor-pointer hover:text-electric-500 transition-colors focus:outline-none"
        >
           {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full mt-4 p-2 rounded-3xl bg-dark-900/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden md:hidden z-40"
          >
            <div className="flex flex-col gap-1 p-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-center py-4 text-sm font-bold tracking-widest uppercase transition-colors rounded-2xl ${
                      isActive ? 'bg-electric-500/10 text-electric-500 border border-electric-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;