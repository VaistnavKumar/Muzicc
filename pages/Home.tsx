import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Headphones, Zap, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const trendingHits = [
  { id: 1, title: "Midnight Echoes", genre: "Synthwave", image: "https://picsum.photos/seed/101/600/600" },
  { id: 2, title: "Neon Horizon", genre: "Cyberpunk", image: "https://picsum.photos/seed/152/600/600" },
  { id: 3, title: "Bass Overload", genre: "Dubstep", image: "https://picsum.photos/seed/123/600/600" },
  { id: 4, title: "Velvet Shade", genre: "Lo-Fi", image: "https://picsum.photos/seed/144/600/600" },
  { id: 5, title: "Circuit Breaker", genre: "Glitch", image: "https://picsum.photos/seed/155/600/600" },
  { id: 6, title: "Lunar Tides", genre: "Ambient", image: "https://picsum.photos/seed/166/600/600" },
  { id: 7, title: "Astral Plane", genre: "Trance", image: "https://picsum.photos/seed/177/600/600" },
  { id: 8, title: "Digital Rain", genre: "Techno", image: "https://picsum.photos/seed/188/600/600" },
];

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-electric-500/50 transition-colors group">
    <div className="w-12 h-12 bg-dark-800 rounded-lg flex items-center justify-center text-electric-500 mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(239,68,68,0.2)]">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trendingHits.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % trendingHits.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + trendingHits.length) % trendingHits.length);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationId: number;
    let time = 0;

    const particles = 180; 
    const baseRadius = Math.min(width, height) * 0.22;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      time += 0.02;

      ctx.beginPath();
      
      for (let i = 0; i <= particles; i++) {
        const angle = (Math.PI * 2 * i) / particles;
        const noise = 
          Math.sin(angle * 10 + time * 3) * 10 + 
          Math.cos(angle * 20 - time * 5) * 5 +
          Math.sin(time * 2) * 20; 

        const r = baseRadius + noise;
        const x = centerX + Math.cos(angle + time * 0.1) * r;
        const y = centerY + Math.sin(angle + time * 0.1) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        if (i % 2 === 0) {
            const particleSize = Math.abs(Math.sin(angle * 5 + time * 4)) * 3 + 1;
            ctx.save();
            ctx.fillStyle = `rgba(239, 68, 68, ${0.5 + Math.sin(time + i) * 0.5})`; 
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(x, y, particleSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
      }
      
      ctx.closePath();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.6 + Math.sin(time * 4) * 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative w-full h-[100vh] -mt-32 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ mixBlendMode: 'screen' }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter text-center leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            FEEL THE <span className="text-electric-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]">BEAT</span>
          </motion.h1>
        </div>

        <div className="absolute bottom-20 left-0 w-full text-center z-20 pointer-events-none">
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-gray-400 text-lg md:text-2xl font-light tracking-[0.2em] uppercase mb-8"
            >
                Visualize the Sound
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                <div className="inline-block w-1 h-12 bg-electric-500 rounded-full animate-pulse shadow-[0_0_20px_#ef4444]"></div>
            </motion.div>
        </div>
      </div>

      {/* Trending Slideshow Section */}
      <section className="py-24 bg-dark-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end relative z-20">
            <h2 className="text-4xl font-bold">Trending <span className="text-electric-500">Hits</span></h2>
            <Link to="/explore" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">View All</Link>
        </div>
          
        {/* 3D Stack Carousel */}
        <div className="relative h-[450px] flex items-center justify-center perspective-[1000px] max-w-7xl mx-auto">
            
            {/* Controls */}
            <button 
                onClick={handlePrev}
                className="absolute left-4 md:left-10 z-30 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-electric-500 transition-all hover:scale-110"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={handleNext}
                className="absolute right-4 md:right-10 z-30 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-electric-500 transition-all hover:scale-110"
            >
                <ChevronRight size={24} />
            </button>

            {/* Slides */}
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence initial={false}>
                    {trendingHits.map((hit, index) => {
                        // Calculate position relative to active index with wrapping
                        let offset = (index - activeIndex);
                        const total = trendingHits.length;
                        
                        // Handle circular wrap logic for visual positioning
                        if (offset > total / 2) offset -= total;
                        if (offset < -total / 2) offset += total;

                        // Only render items within a certain range to keep DOM light and visual clean
                        if (Math.abs(offset) > 2) return null;

                        const isActive = offset === 0;
                        const direction = offset > 0 ? 1 : -1;
                        const absOffset = Math.abs(offset);

                        return (
                            <motion.div
                                key={hit.id}
                                className={`absolute rounded-2xl overflow-hidden shadow-2xl border ${isActive ? 'border-electric-500/50' : 'border-white/5'}`}
                                style={{
                                    width: '320px', 
                                    height: '320px', 
                                    // Mobile adjustment could be done with media queries in classes, 
                                    // but framing is consistent here.
                                    zIndex: 10 - absOffset,
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                    x: `${offset * 60}%`, // Percentage based offset for responsiveness
                                    scale: 1 - (absOffset * 0.15),
                                    opacity: isActive ? 1 : 0.5 - (absOffset * 0.1),
                                    rotateY: isActive ? 0 : direction * -15, // Subtle 3D rotation
                                    filter: isActive ? 'blur(0px) brightness(1)' : 'blur(2px) brightness(0.5)',
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                whileHover={isActive ? { scale: 1.05 } : {}}
                            >
                                <img src={hit.image} alt={hit.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                                
                                <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-300">
                                    <h4 className="text-2xl font-bold mb-1 text-white shadow-black drop-shadow-md">{hit.title}</h4>
                                    <p className="text-electric-500 text-sm uppercase tracking-wider font-bold mb-4">{hit.genre}</p>
                                    
                                    {isActive && (
                                        <motion.button 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-electric-500 transition-colors font-bold uppercase tracking-widest text-xs gap-2"
                                        >
                                            <Play size={14} fill="currentColor" /> Play Now
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
            {trendingHits.map((_, i) => (
                <button 
                    key={i} 
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-electric-500' : 'bg-gray-700 hover:bg-gray-500'}`}
                />
            ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Powered by <span className="text-electric-500">Sound</span></h2>
            <p className="text-gray-400">Our proprietary audio engine decomposes tracks in real-time to create stunning, lag-free visualizations that react to every frequency.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap />} 
              title="Real-time Latency" 
              desc="Experience zero-delay visual feedback. The graphics render precisely when the beat hits your ears." 
            />
            <FeatureCard 
              icon={<BarChart3 />} 
              title="Frequency Analysis" 
              desc="Deep spectral decomposition separates bass, mids, and highs for layered visual complexity." 
            />
            <FeatureCard 
              icon={<Headphones />} 
              title="Immersive 3D Audio" 
              desc="Spatial audio support places you in the center of the mix for a truly surrounding experience." 
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;