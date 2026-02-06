import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const CyberButton = ({ children, onClick, variant = 'primary', className, icon: Icon, disabled = false, ...props }) => {

    const variants = {
        primary: "bg-neon-purple/10 text-neon-purple border-neon-purple/50 hover:bg-neon-purple/20 hover:shadow-[0_0_15px_rgba(176,38,255,0.4)]",
        secondary: "bg-noir-800 text-gray-300 border-noir-600 hover:border-gray-400 hover:text-white",
        success: "bg-neon-green/10 text-neon-green border-neon-green/50 hover:bg-neon-green/20 hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]",
        danger: "bg-neon-pink/10 text-neon-pink border-neon-pink/50 hover:bg-neon-pink/20 hover:shadow-[0_0_15px_rgba(255,0,85,0.4)]",
        ghost: "bg-transparent border-transparent text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5",
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={onClick}
            disabled={disabled}
            className={twMerge(
                clsx(
                    "relative px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider border rounded transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden",
                    variants[variant],
                    disabled && "opacity-50 cursor-not-allowed hover:shadow-none hover:bg-transparent grayscale",
                    className
                )
            )}
            {...props}
        >
            {/* Scanline effect on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-shine" />

            {Icon && <Icon size={18} className={clsx("relative z-10", variant === 'primary' && "animate-pulse-slow")} />}
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default CyberButton;
