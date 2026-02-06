import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, theme = "vs-dark" }) => {
    const handleEditorChange = (value, event) => {
        onChange(value);
    };

    return (
        <div className="h-full w-full rounded overflow-hidden border border-noir-600 shadow-inner bg-[#1e1e1e]">
            <Editor
                height="100%"
                defaultLanguage="python"
                value={code}
                theme={theme}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    fontFamily: "'Fira Code', monospace",
                    roughness: 0,
                }}
            />
        </div>
    );
};

export default CodeEditor;
