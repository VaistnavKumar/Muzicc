import React from 'react';
import { NavLink } from 'react-router-dom';
import { Disc, Instagram, Twitter, Youtube, Facebook, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-electric-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Disc className="w-8 h-8 text-electric-500 animate-spin-slow" />
              <span className="text-2xl font-bold tracking-tighter text-white">
                MUZICCC<span className="text-electric-500">.</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              The next generation of audio visualization. Experience music like never before with our immersive rhythmic engines.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-electric-500 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Discover</h4>
            <ul className="space-y-4">
              {['Home', 'Explore', 'Artists', 'Contact'].map((item) => (
                <li key={item}>
                  <NavLink to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-electric-500 transition-colors">
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal/Support */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-electric-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Stay Tuned</h4>
            <p className="text-gray-400 text-sm mb-4">Join our newsletter for the latest drops and updates.</p>
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1 focus-within:border-electric-500 transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent w-full px-4 text-white placeholder-gray-600 focus:outline-none"
              />
              <button className="p-2 bg-electric-500 rounded-md text-white hover:bg-electric-600 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 Muziccc Inc. All rights reserved.</p>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            Designed with <span className="text-electric-500">♥</span> for the future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;