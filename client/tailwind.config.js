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
                    900: '#0a0a0a', // Rich Black
                    800: '#121212', // Dark Grey
                    700: '#1f1f1f', // Component bg
                    600: '#2d2d2d', // Borders
                    500: '#404040', // Muted text
                },
                neon: {
                    purple: '#b026ff',
                    green: '#00ff41',
                    blue: '#54c7ec',
                    red: '#ff0055',
                }
            },
            fontFamily: {
                mono: ['"Fira Code"', 'monospace'], // Detective feel
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
