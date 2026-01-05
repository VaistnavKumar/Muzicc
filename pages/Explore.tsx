import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Radio, Activity, Disc, Heart, Share2, MoreHorizontal } from 'lucide-react';
import PageTransition from '../components/PageTransition';

// Background Animation Component: Liquid Sine Waves
const WaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'; // Trail effect
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineWidth = 2;
      time += 0.05;

      // Draw multiple sine waves
      for (let j = 1; j <= 3; j++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.15 * j})`; // Varying opacity red
        
        for (let x = 0; x < width; x += 5) {
          // Complex wave formula for liquid effect
          const y = height / 2 + 
            Math.sin(x * 0.01 + time * j * 0.5) * 50 * j +
            Math.cos(x * 0.005 - time) * 30;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[-1]" />;
};

const VisualizerBar: React.FC<{ delay: number; height: string }> = ({ delay, height }) => (
  <div 
    className="w-2 bg-electric-500 rounded-t-sm shadow-[0_0_10px_#ef4444]"
    style={{ 
      height: height,
      animation: `bounce 1s infinite ease-in-out ${delay}s alternate` 
    }}
  />
);

const Card: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; color?: string }> = ({ title, subtitle, icon, color = "bg-dark-800" }) => {
    return (
        <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className={`relative overflow-hidden ${color} rounded-2xl p-6 border border-white/5 group`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex justify-between items-start mb-12">
                <div className="p-3 bg-white/5 rounded-full backdrop-blur-sm text-electric-500 group-hover:text-white group-hover:bg-electric-500 transition-colors duration-300">
                    {icon}
                </div>
                <div className="flex gap-1 h-8 items-end">
                    {[...Array(5)].map((_, i) => (
                         <div key={i} className={`w-1 bg-gray-600 group-hover:bg-electric-500 transition-colors duration-300 animate-pulse`} style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>
            </div>
            
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
                <p className="text-gray-400 text-sm">{subtitle}</p>
            </div>
        </motion.div>
    )
}

const TrackRow: React.FC<{ rank: number; title: string; artist: string; duration: string }> = ({ rank, title, artist, duration }) => (
  <div className="flex items-center p-4 hover:bg-white/5 rounded-xl transition-colors group border-b border-white/5 last:border-0">
    <div className="w-8 text-center text-gray-500 font-bold group-hover:text-electric-500">{rank}</div>
    <div className="mx-4 relative w-12 h-12 rounded-lg overflow-hidden bg-dark-800">
      <img src={`https://picsum.photos/seed/${rank + 100}/100/100`} alt="art" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Play size={16} fill="white" className="text-white" />
      </div>
    </div>
    <div className="flex-1">
      <h4 className="text-white font-medium">{title}</h4>
      <p className="text-xs text-gray-500 uppercase">{artist}</p>
    </div>
    <div className="hidden md:flex gap-4 mr-8 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
      <Heart size={18} className="hover:text-electric-500 cursor-pointer" />
      <Share2 size={18} className="hover:text-white cursor-pointer" />
      <MoreHorizontal size={18} className="hover:text-white cursor-pointer" />
    </div>
    <div className="text-sm text-gray-500 font-mono">{duration}</div>
  </div>
);

const Explore: React.FC = () => {
  return (
    <PageTransition>
      <WaveBackground />
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-white/10 pb-8">
            <div>
                <h2 className="text-5xl font-bold mb-2 text-white">Explore Sound</h2>
                <p className="text-gray-400 max-w-lg">
                    Interact with real-time generated waveforms and simulated environments.
                </p>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
                <button className="px-6 py-2 rounded-full border border-white/20 hover:border-electric-500 hover:text-electric-500 transition-colors uppercase text-xs tracking-widest font-bold">Latest</button>
                <button className="px-6 py-2 rounded-full bg-electric-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all uppercase text-xs tracking-widest font-bold">Trending</button>
            </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card title="Bass Reactive" subtitle="Low frequency visualization" icon={<Activity />} />
            <Card title="Synthwave" subtitle="Retro-futuristic beats" icon={<Radio />} />
            <Card title="Deep House" subtitle="Rhythmic pulses" icon={<TrendingUp />} />
        </div>

        {/* Large Visualizer Preview */}
        <div className="mb-24 relative w-full h-64 md:h-96 bg-dark-800 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/1200/600?grayscale&blur=2')] bg-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
            
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-20 w-16 h-16 md:w-20 md:h-20 bg-electric-500 rounded-full flex items-center justify-center shadow-[0_0_30px_#ef4444] group-hover:shadow-[0_0_50px_#ef4444] transition-shadow duration-500"
            >
                <Play fill="white" className="ml-1 w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.button>
            
            {/* Simulated animated bars at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-between px-4 md:px-12 pb-8 gap-1 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(40)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-full bg-electric-500 rounded-t-full shadow-[0_0_5px_#ef4444]"
                        style={{ 
                            height: `${Math.sin(i) * 30 + 50 + Math.random() * 20}%`,
                            animation: `pulse 0.5s infinite alternate ${i * 0.05}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>

        {/* New Content: Moods & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Moods / Genres */}
            <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold mb-8">Browse by <span className="text-electric-500">Mood</span></h3>
                <div className="flex flex-wrap gap-3">
                    {['Cyberpunk', 'Lo-Fi', 'Industrial', 'Techno', 'Ambient', 'Glitch', 'Vaporwave', 'Darksynth', 'Neurofunk'].map((genre) => (
                        <span key={genre} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-electric-500 hover:border-electric-500 cursor-pointer transition-all duration-300 text-sm font-medium">
                            {genre}
                        </span>
                    ))}
                </div>
                
                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-electric-600 to-purple-800 relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-xl font-bold mb-2">Featured Mix</h4>
                        <p className="text-white/80 text-sm mb-4">"Neon Nights Vol. 4" by Void Walker</p>
                        <button className="px-4 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">Listen Now</button>
                    </div>
                    <Disc className="absolute -bottom-4 -right-4 w-32 h-32 text-white/20 animate-spin-slow" />
                </div>
            </div>

            {/* Top Charts */}
            <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold">Global <span className="text-electric-500">Charts</span></h3>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">{'<'}</button>
                        <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">{'>'}</button>
                    </div>
                </div>
                
                <div className="bg-dark-900 border border-white/5 rounded-2xl p-2">
                    <TrackRow rank={1} title="Digital Dreams" artist="Neon Pulse" duration="3:42" />
                    <TrackRow rank={2} title="System Failure" artist="Glitch Mob" duration="4:05" />
                    <TrackRow rank={3} title="Void Calling" artist="Dark Matter" duration="5:12" />
                    <TrackRow rank={4} title="Cybernetic Heart" artist="Android Soul" duration="2:58" />
                    <TrackRow rank={5} title="Mainframe Breach" artist="Hacker One" duration="3:30" />
                </div>
            </div>

        </div>

      </div>
      
      <style>{`
        @keyframes bounce {
            0% { height: 10%; }
            100% { height: 100%; }
        }
      `}</style>
    </PageTransition>
  );
};

export default Explore;