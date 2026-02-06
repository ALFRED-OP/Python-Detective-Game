import { ReactLenis } from 'lenis/react';
import Navbar from '../Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <ReactLenis root>
            <div className="min-h-screen flex flex-col relative text-gray-200 font-sans selection:bg-neon-purple/30 selection:text-neon-purple">

                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* Footer or Bottom decorative elements could go here */}
                <footer className="py-6 text-center text-xs text-noir-500 font-mono">
                    System Protocol v2.5.0 // Authorized Personnel Only
                </footer>
            </div>
        </ReactLenis>
    );
};

export default Layout;
