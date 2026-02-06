/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                noir: {
                    950: '#050505', // Deepest Black
                    900: '#0a0a0a', // Rich Black
                    800: '#121212', // Background
                    700: '#1f1f1f', // Component bg
                    600: '#2d2d2d', // Borders
                    500: '#404040', // Muted
                },
                neon: {
                    purple: '#b026ff',
                    cyan: '#00f3ff',
                    green: '#00ff41',
                    pink: '#ff0055',
                    blue: '#54c7ec',
                },
                glass: {
                    100: 'rgba(255, 255, 255, 0.05)',
                    200: 'rgba(255, 255, 255, 0.1)',
                }
            },
            fontFamily: {
                mono: ['"Fira Code"', 'monospace'],
                sans: ['Inter', 'sans-serif'],
                display: ['"Orbitron"', 'sans-serif'], // Added for headers if needed
            },
            backgroundImage: {
                'cyber-gradient': 'linear-gradient(to right, #0a0a0a, #1a1a1a)',
                'neon-glow': 'radial-gradient(circle at center, rgba(176, 38, 255, 0.1) 0%, transparent 70%)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glitch': 'glitch 1s linear infinite',
            },
        },
    },
    plugins: [],
}
