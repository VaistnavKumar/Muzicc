import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Twitter, Globe, Send, Plus, Minus } from 'lucide-react';
import PageTransition from '../components/PageTransition';

// Background Animation: Signal Bars / Digital Rain (Bottom aligned)
const SignalBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        const bars = 100;
        const barWidth = width / bars;
        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            time += 0.05;

            // Draw equalizers at the bottom
            for (let i = 0; i < bars; i++) {
                // Generate varied height using sine overlapping for "beat" feel
                const h = 
                    Math.abs(Math.sin(i * 0.1 + time) * 100) + 
                    Math.abs(Math.cos(i * 0.05 - time * 2) * 50);

                const x = i * barWidth;
                const y = height - h;
                
                // Color variation
                const isPeak = h > 120;
                ctx.fillStyle = isPeak ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.05)';
                
                ctx.fillRect(x, y, barWidth - 2, h);
                
                // Mirror reflection at top (subtle data stream)
                ctx.fillStyle = 'rgba(239, 68, 68, 0.02)';
                ctx.fillRect(x, 0, barWidth - 2, h * 0.5);
            }

            requestAnimationFrame(animate);
        }

        const animId = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        }
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[-1]" />;
};

const InputField: React.FC<{ label: string; type: string; placeholder: string }> = ({ label, type, placeholder }) => (
    <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">{label}</label>
        <input 
            type={type} 
            placeholder={placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-electric-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300"
        />
    </div>
);

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
    <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-electric-500 hover:bg-electric-500 hover:shadow-[0_0_20px_#ef4444] transition-all duration-300 transform hover:-translate-y-1">
        {icon}
    </a>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-electric-500' : 'text-white group-hover:text-electric-500'}`}>{question}</span>
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-electric-500' : 'text-gray-500'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const Contact: React.FC = () => {
  return (
    <PageTransition>
      <SignalBackground />
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Top Contact Section */}
        <div className="flex flex-col md:flex-row gap-16 items-start mb-24">
            
            {/* Info Section */}
            <div className="w-full md:w-1/2 sticky top-32">
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-5xl font-bold mb-6"
                >
                    Get In <span className="text-electric-500">Touch</span>
                </motion.h2>
                <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                    Whether you're an artist looking to collaborate or a listener with feedback, we want to hear the noise you make.
                </p>

                <div className="flex gap-6 mb-12">
                    <SocialIcon icon={<Instagram size={20} />} />
                    <SocialIcon icon={<Twitter size={20} />} />
                    <SocialIcon icon={<Globe size={20} />} />
                    <SocialIcon icon={<Mail size={20} />} />
                </div>

                <div className="p-6 bg-dark-800 rounded-xl border border-white/5 inline-block">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">General Inquiries</p>
                    <p className="text-xl text-white font-mono">hello@muziccc.io</p>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2">
                <motion.form 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-dark-800/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl"
                >
                    <InputField label="Your Name" type="text" placeholder="John Doe" />
                    <InputField label="Email Address" type="email" placeholder="john@example.com" />
                    
                    <div className="mb-8">
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Message</label>
                        <textarea 
                            rows={4}
                            placeholder="Tell us about your project..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-electric-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300 resize-none"
                        />
                    </div>

                    <button className="w-full py-4 bg-electric-500 hover:bg-electric-600 text-white font-bold tracking-widest uppercase rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group">
                        <span>Send Message</span>
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.form>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-white/10 pt-24">
            <h3 className="text-3xl font-bold mb-12 text-center">Frequently Asked <span className="text-electric-500">Questions</span></h3>
            <div className="max-w-3xl mx-auto">
                <FAQItem 
                    question="How do I submit my music to Muziccc?" 
                    answer="You can use the 'Submit Demo' button on the Artists page. We review submissions weekly and will get back to you if your sound fits our roster." 
                />
                <FAQItem 
                    question="Is the visualizer compatible with mobile devices?" 
                    answer="Yes! Our visualizer engine is optimized for WebGL on mobile devices. However, for the best immersive experience, we recommend using a desktop browser." 
                />
                <FAQItem 
                    question="Do you offer licensing for your visual assets?" 
                    answer="Our visual assets are proprietary. However, we do offer commercial licenses for live events and venue installations. Contact us for a quote." 
                />
                <FAQItem 
                    question="What audio formats do you support?" 
                    answer="We support all major high-fidelity audio formats including FLAC, WAV, and 320kbps MP3." 
                />
            </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default Contact;