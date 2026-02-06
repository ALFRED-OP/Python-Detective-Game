import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Terminal as TerminalIcon, XCircle } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { clsx } from 'clsx';
import { ReactLenis } from 'lenis/react';

const Typewriter = ({ text, delay = 10, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let isCancelled = false;
        let currentText = '';

        const interval = setInterval(() => {
            if (isCancelled) return;

            if (currentText.length < text.length) {
                currentText += text.charAt(currentText.length);
                setDisplayedText(currentText);
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, delay);

        return () => {
            isCancelled = true;
            clearInterval(interval);
        };
    }, [text, delay, onComplete]);

    return <span>{displayedText}</span>;
}

const TerminalOutput = ({ output, status }) => {
    return (
        <div className="flex flex-col h-full bg-noir-900 rounded-lg border border-noir-600 overflow-hidden font-mono text-sm shadow-inner relative group">
            {/* Header */}
            <div className="bg-noir-800 px-4 py-2 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400">
                    <TerminalIcon size={14} />
                    <span className="text-xs font-bold tracking-widest">OUTPUT CONSOLE</span>
                </div>

                <div className="flex items-center gap-3">
                    {status === 'running' && (
                        <span className="flex items-center text-neon-cyan text-xs">
                            <span className="w-2 h-2 bg-neon-cyan rounded-full mr-2 animate-pulse" />
                            EXECUTING...
                        </span>
                    )}
                    {status === 'passed' && (
                        <span className="flex items-center text-neon-green text-xs font-bold animate-pulse">
                            <CheckCircle size={14} className="mr-1" /> PASSED
                        </span>
                    )}
                    {status === 'failed' && (
                        <span className="flex items-center text-red-500 text-xs font-bold">
                            <XCircle size={14} className="mr-1" /> FAILED
                        </span>
                    )}
                    {status === 'error' && (
                        <span className="flex items-center text-yellow-500 text-xs font-bold">
                            <AlertCircle size={14} className="mr-1" /> ERROR
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-auto scrollbar-thin relative font-mono text-xs leading-5">
                {/* Scanline background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%] opacity-20" />

                <div className="relative z-10 text-gray-300 whitespace-pre-wrap">
                    {output ? (
                        <Typewriter key={output} text={output} delay={5} />
                    ) : (
                        <span className="text-gray-600 italic opacity-50">// Waiting for input...</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TerminalOutput;
