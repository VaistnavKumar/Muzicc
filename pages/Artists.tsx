import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic2, Music4, Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';

interface Artist {
  id: number;
  name: string;
  genre: string;
  img: string;
}

const artists: Artist[] = [
  { id: 1, name: "Neon Pulse", genre: "Synthwave", img: "https://picsum.photos/id/64/400/400" },
  { id: 2, name: "Cyber Node", genre: "Techno", img: "https://picsum.photos/id/91/400/400" },
  { id: 3, name: "Echo Void", genre: "Ambient", img: "https://picsum.photos/id/129/400/400" },
  { id: 4, name: "Red Shift", genre: "Drum & Bass", img: "https://picsum.photos/id/158/400/400" },
  { id: 5, name: "Binary Beats", genre: "Glitch", img: "https://picsum.photos/id/234/400/400" },
  { id: 6, name: "Flux State", genre: "House", img: "https://picsum.photos/id/338/400/400" },
];

// Background Animation: Radial Speaker Pulse
const RadialPulseBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Circle properties
        const circles: { r: number, opacity: number }[] = [];
        const maxRadius = Math.max(width, height) * 0.8;
        let frame = 0;

        const animate = () => {
            // Semi-transparent clear for fade effect (if desired) or simple clear
            ctx.clearRect(0, 0, width, height);
            
            // Add new circle periodically (The "Beat")
            frame++;
            if (frame % 60 === 0) {
                circles.push({ r: 0, opacity: 0.5 });
            }

            const cx = width / 2;
            const cy = height / 3; // Center slightly higher for visual balance

            // Draw and update circles
            for (let i = 0; i < circles.length; i++) {
                const c = circles[i];
                c.r += 2; // Expansion speed
                c.opacity -= 0.002; // Fade speed

                if (c.opacity <= 0) {
                    circles.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(cx, cy, c.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(239, 68, 68, ${c.opacity * 0.5})`; // Electric Red
                ctx.lineWidth = 2;
                ctx.stroke();

                // Optional: Secondary thinner ring
                ctx.beginPath();
                ctx.arc(cx, cy, c.r * 0.9, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${c.opacity * 0.1})`;
                ctx.lineWidth = 1;
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
}

const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col items-center"
    >
      <div className="relative mb-6">
        {/* Animated Rings Container */}
        <div className="absolute inset-0 -m-8 rounded-full border border-electric-500/0 group-hover:border-electric-500/30 transition-all duration-700 scale-50 group-hover:scale-100 group-hover:animate-pulse"></div>
        <div className="absolute inset-0 -m-4 rounded-full border border-electric-500/0 group-hover:border-electric-500/50 transition-all duration-500 scale-75 group-hover:scale-100"></div>
        
        {/* Avatar */}
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-electric-500 transition-colors duration-500 shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] z-10">
            <img src={artist.img} alt={artist.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-electric-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-electric-500 transition-colors duration-300">{artist.name}</h3>
      <p className="text-sm text-gray-500 uppercase tracking-widest mt-2">{artist.genre}</p>
    </motion.div>
  );
};

const Artists: React.FC = () => {
  return (
    <PageTransition>
      <RadialPulseBackground />
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
                THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-500 to-purple-600">LINEUP</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Curating the future of sound. Meet the architects of the new digital rhythm.
            </p>
        </div>

        {/* Spotlight Section */}
        <div className="mb-24 rounded-3xl bg-dark-800 border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-electric-600/20 to-transparent"></div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-96 relative">
                     <img src="https://picsum.photos/id/399/800/800?grayscale" className="w-full h-full object-cover" alt="Spotlight" />
                     <div className="absolute inset-0 bg-electric-500/10 mix-blend-overlay"></div>
                </div>
                <div className="p-8 md:p-16 flex flex-col justify-center relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-electric-500 font-bold uppercase tracking-widest text-xs">
                        <Star size={14} fill="currentColor" />
                        Artist of the Month
                    </div>
                    <h3 className="text-4xl font-bold mb-4">Solar Frequency</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Redefining the boundaries between organic sound and digital synthesis. Their latest album "Horizon Event" is streaming now on all platforms.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors rounded-lg">Listen</button>
                        <button className="px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-electric-500 hover:text-electric-500 transition-colors rounded-lg">Profile</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8 mb-24">
            {artists.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-dark-800 to-dark-900 border border-white/5 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-dark-900 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-electric-500">
                    <Mic2 size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Are you the next big sound?</h3>
                <p className="text-gray-400 max-w-lg mx-auto mb-8">
                    We are always looking for visionary artists to join the Muziccc collective. Send us your demos.
                </p>
                <button className="px-10 py-4 bg-electric-500 text-white font-bold uppercase tracking-widest rounded-full hover:bg-electric-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all">
                    Submit Demo
                </button>
            </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Artists;