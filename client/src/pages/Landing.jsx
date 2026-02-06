import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactLenis from 'lenis/react';
import HeroCanvas from '../components/landing/HeroCanvas';
import GlassCard from '../components/common/GlassCard';
import CyberButton from '../components/common/CyberButton';
import { Terminal, Shield, Code, Cpu, ChevronDown, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
    const navigate = useNavigate();
    const containerRef = useRef();

    useEffect(() => {
        // GSAP Staggered Reveal for Hero
        const ctx = gsap.context(() => {
            gsap.from('.hero-reveal', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.5
            });

            // Feature cards scroll animation
            gsap.fromTo('.feature-card',
                { y: 100, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.features-grid',
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    overwrite: true
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const features = [
        {
            title: "Story-Driven Logic",
            desc: "Every bug is a clue. Read crime scene reports to deduce what the corrupted code was meant to do.",
            icon: <Terminal className="text-neon-cyan" size={32} />,
            delay: 0
        },
        {
            title: "Hardened Sandbox",
            desc: "Execute your fixes in a secure, digital isolation chamber. 2.0s execution limits ensure system safety.",
            icon: <Shield className="text-neon-purple" size={32} />,
            delay: 0.1
        },
        {
            title: "Cyber-Deck Editor",
            desc: "A custom-tuned workspace for the modern detective. Real-time syntax highlighting and case persistence.",
            icon: <Code className="text-neon-green" size={32} />,
            delay: 0.2
        }
    ];

    return (
        <ReactLenis root>
            <div ref={containerRef} className="bg-noir-950 text-white min-h-screen selection:bg-neon-purple/30 selection:text-neon-cyan overflow-x-hidden">

                {/* Immersive Background */}
                <HeroCanvas />

                {/* Hero Section */}
                <section className="relative h-screen flex flex-col items-center justify-center px-4 pt-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(0,243,255,0.05)_0%,transparent_60%)]"
                    />

                    <div className="text-center z-10 max-w-5xl mx-auto">
                        <h4 className="hero-reveal text-neon-cyan font-display tracking-[0.3em] text-sm md:text-base mb-4 opacity-80">
              // SYSTEM INITIALIZED: DETECTIVE PROTOCOL
                        </h4>

                        <h1 className="hero-reveal text-5xl md:text-8xl font-display font-black mb-6 leading-tight">
                            DECODE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-cyan animate-pulse-slow">MURDER</span>
                        </h1>

                        <p className="hero-reveal text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
                            Analyze crime scene scripts, patch logic gaps, and catch digital killers in a cyber-noir programming mystery.
                        </p>

                        <div className="hero-reveal flex flex-col md:flex-row gap-4 justify-center">
                            <CyberButton
                                variant="primary"
                                size="lg"
                                onClick={() => navigate('/register')}
                                className="!px-12 !py-4 text-lg"
                            >
                                ENTER THE ACADEMY
                            </CyberButton>
                            <CyberButton
                                variant="ghost"
                                size="lg"
                                onClick={() => navigate('/login')}
                                className="!px-12 !py-4 text-lg border-white/10"
                            >
                                RESUME INVESTIGATION
                            </CyberButton>
                        </div>
                    </div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] tracking-widest font-mono uppercase">Scroll to brief</span>
                        <ChevronDown size={20} />
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="relative py-32 px-4 bg-noir-900/50 backdrop-blur-sm border-y border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">THE INVESTIGATION CORE</h2>
                            <div className="h-1 w-24 bg-neon-purple mx-auto rounded-full" />
                        </div>

                        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, i) => (
                                <GlassCard key={i} className="feature-card h-full" animate={false}>
                                    <div className="mb-6 p-3 w-fit rounded-xl bg-white/5 border border-white/10 group-hover:border-neon-purple/50 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:text-neon-cyan transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                        {feature.desc}
                                    </p>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-24 px-4 bg-noir-950">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { label: "Active Cases", val: "30+", icon: <Zap className="text-yellow-400" size={16} /> },
                            { label: "Sandbox Security", val: "Lvl 4", icon: <Cpu className="text-neon-cyan" size={16} /> },
                            { label: "Master Detectives", val: "2.4k", icon: <Shield className="text-neon-purple" size={16} /> },
                            { label: "Logic Puzzles", val: "∞", icon: <Code className="text-neon-green" size={16} /> }
                        ].map((stat, i) => (
                            <div key={i} className="p-6 text-center border border-white/5 rounded-2xl hover:bg-white/[0.02] transition-colors">
                                <div className="flex justify-center items-center gap-2 mb-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
                                    {stat.icon} {stat.label}
                                </div>
                                <div className="text-3xl font-display font-black text-white">{stat.val}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-neon-purple/5 blur-[120px] rounded-full -translate-y-1/2" />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-4xl md:text-6xl font-display font-black mb-8 leading-tight">
                            READY TO <span className="text-neon-cyan">ANALYZE</span> THE EVIDENCE?
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
                            Join thousands of investigators in the world's first cyber-noir coding academy.
                        </p>
                        <CyberButton
                            variant="success"
                            size="lg"
                            onClick={() => navigate('/register')}
                            className="!px-16 !py-5 text-xl font-display shadow-[0_0_50px_rgba(0,255,65,0.2)] hover:shadow-[0_0_70px_rgba(0,255,65,0.4)]"
                        >
                            START INVESTIGATION
                        </CyberButton>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-4 border-t border-white/5 text-center bg-noir-950/80">
                    <div className="text-[10px] font-mono text-gray-600 tracking-[0.5em] mb-4 uppercase">
                        Python Detective Academy // Class of 2026
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                        Handcrafted for Advanced Level Programming Excellence
                    </p>
                </footer>
            </div>
        </ReactLenis>
    );
};

export default Landing;
