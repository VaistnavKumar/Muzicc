import React from 'react';
import { NavLink } from 'react-router-dom';
import { Disc, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Artists', path: '/artists' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-auto transition-all duration-300">
      <div className="backdrop-blur-2xl bg-black/40 border border-white/10 rounded-full px-8 py-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex justify-between items-center md:gap-12 relative overflow-hidden ring-1 ring-white/5">
        
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group cursor-pointer shrink-0 z-10">
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
        <div className="md:hidden text-white p-1 z-10 cursor-pointer hover:text-electric-500 transition-colors">
           <Menu className="w-5 h-5" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;