import Editor from '@monaco-editor/react';
import { clsx } from 'clsx';
import { useState } from 'react';

const CodeEditor = ({ code, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleEditorChange = (value) => {
        onChange(value);
    };

    return (
        <div className={clsx(
            "h-full w-full rounded-lg overflow-hidden border transition-all duration-300 flex flex-col relative",
            isFocused ? "border-neon-purple/50 shadow-[0_0_15px_rgba(176,38,255,0.1)]" : "border-noir-600"
        )}>

            {/* Editor Glow (pseudo-element style) */}
            <div className="absolute inset-0 bg-neon-purple/5 pointer-events-none opacity-0 transition-opacity duration-300"
                style={{ opacity: isFocused ? 0.05 : 0 }} />

            <div className="flex-1 relative z-10 bg-[#1e1e1e]">
                <Editor
                    height="100%"
                    defaultLanguage="python"
                    value={code}
                    theme="vs-dark"
                    onChange={handleEditorChange}
                    onMount={(editor) => {
                        editor.onDidFocusEditorText(() => setIsFocused(true));
                        editor.onDidBlurEditorText(() => setIsFocused(false));
                    }}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'Fira Code', monospace",
                        fontLigatures: true,
                        scrollBeyondLastLine: false,
                        padding: { top: 16, bottom: 16 },
                        lineNumbers: 'on',
                        renderLineHighlight: 'line',
                        cursorBlinking: 'smooth',
                        cursorSmoothCaretAnimation: 'on',
                        smoothScrolling: true,
                        mouseWheelZoom: true,
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
