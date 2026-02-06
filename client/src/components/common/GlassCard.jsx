import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", delay = 0, animate = true }) => {
    const motionProps = animate ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: "easeOut" },
        viewport: { once: true }
    } : {};

    return (
        <motion.div
            {...motionProps}
            className={`glass-card p-8 rounded-2xl relative overflow-hidden group ${className}`}
        >
            {/* Animated Gradient Border Overlay */}
            <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-neon-purple/30 transition-colors duration-500" />

            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-purple/5 blur-[100px] group-hover:bg-neon-purple/10 transition-colors" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
