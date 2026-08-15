import { useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { executeCode } from "../../api/code.api";

import {
    FaTimes,
    FaReact,
    FaCss3Alt,
    FaPlus,
    FaPlay,
    FaTerminal,
} from "react-icons/fa";

import "./CodeEditor.css";
import { socket } from "../../socket/socket";

const LANGUAGE_OPTIONS = {
    javascript: {
        label: "JavaScript",
        monaco: "javascript",
        extension: "js",
        piston: "javascript",
        version: "18.15.0",
    },

    python: {
        label: "Python",
        monaco: "python",
        extension: "py",
        piston: "python",
        version: "3.10.0",
    },

    java: {
        label: "Java",
        monaco: "java",
        extension: "java",
        piston: "java",
        version: "15.0.2",
    },

    cpp: {
        label: "C++",
        monaco: "cpp",
        extension: "cpp",
        piston: "c++",
        version: "10.2.0",
    },

    c: {
        label: "C",
        monaco: "c",
        extension: "c",
        piston: "c",
        version: "10.2.0",
    },

    typescript: {
        label: "TypeScript",
        monaco: "typescript",
        extension: "ts",
        piston: "typescript",
        version: "5.0.3",
    },

    go: {
        label: "Go",
        monaco: "go",
        extension: "go",
        piston: "go",
        version: "1.16.2",
    },

    rust: {
        label: "Rust",
        monaco: "rust",
        extension: "rs",
        piston: "rust",
        version: "1.56.1",
    },

    css: {
        label: "CSS",
        monaco: "css",
        extension: "css",
    },
};

const BOILERPLATES = {
    javascript: `// Start writing your code from here

function main() {
    console.log("Hello, SyncSpace!");
}

main();`,

    python: `# Start writing your code from here

def main():
    print("Hello, SyncSpace!")

if __name__ == "__main__":
    main()`,

    java: `// Start writing your code from here

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, SyncSpace!");
    }
}`,

    cpp: `// Start writing your code from here

#include <iostream>
using namespace std;

int main() {
    cout << "Hello, SyncSpace!";
    return 0;
}`,

    c: `// Start writing your code from here

#include <stdio.h>

int main() {
    printf("Hello, SyncSpace!");
    return 0;
}`,

    typescript: `// Start writing your code from here

function main(): void {
    console.log("Hello, SyncSpace!");
}

main();`,

    go: `// Start writing your code from here

package main

import "fmt"

func main() {
    fmt.Println("Hello, SyncSpace!")
}`,

    rust: `// Start writing your code from here

fn main() {
    println!("Hello, SyncSpace!");
}`,

    css: `/* Start writing your CSS from here */

body {
    margin: 0;
    padding: 0;
}`,
};

function getFileType(language) {
    if (language === "css") {
        return "css";
    }

    if (
        language === "javascript" ||
        language === "typescript"
    ) {
        return "react";
    }

    return "code";
}

function getLanguageFromExtension(
    extension
) {
    const map = {
        js: "javascript",
        jsx: "javascript",
        ts: "typescript",
        tsx: "typescript",
        py: "python",
        java: "java",
        cpp: "cpp",
        c: "c",
        go: "go",
        rs: "rust",
        css: "css",
    };

    return (
        map[extension] ||
        "javascript"
    );
}

function FileIcon({ type }) {
    if (type === "css") {
        return <FaCss3Alt />;
    }

    if (type === "react") {
        return <FaReact />;
    }

    return <FaTerminal />;
}

function CodeEditor({
    roomId,
    files,
    setFiles,
    activeFile,
    setActiveFile,
    codeContent,
    setCodeContent,
    onCreateFile,
    onDeleteFile,
    onFileUpdate,
}) {
    const [isRemoteUpdate, setIsRemoteUpdate] =
        useState(false);

    const [output, setOutput] =
        useState("");

    const [isRunning, setIsRunning] =
        useState(false);

    const [showOutput, setShowOutput] =
        useState(false);

    const activeFileData = useMemo(
        () =>
            files.find(
                (file) =>
                    file.id ===
                    activeFile
            ),
        [files, activeFile]
    );

    const activeLanguage =
        activeFileData?.language ||
        "javascript";

    const languageConfig =
        LANGUAGE_OPTIONS[
        activeLanguage
        ];

    /* =========================================
       REAL-TIME CODE UPDATE
    ========================================= */

    useEffect(() => {
        const handleCodeUpdate = ({
            fileId,
            content,
        }) => {
            if (
                !fileId ||
                content === undefined
            ) {
                return;
            }

            setIsRemoteUpdate(true);

            setCodeContent((prev) => ({
                ...prev,
                [fileId]: content,
            }));

            setTimeout(() => {
                setIsRemoteUpdate(false);
            }, 300);
        };

        socket.on(
            "code-update",
            handleCodeUpdate
        );

        return () => {
            socket.off(
                "code-update",
                handleCodeUpdate
            );
        };
    }, [setCodeContent]);

    /* =========================================
       EDITOR CHANGE
    ========================================= */

    const handleEditorChange = (value) => {
        const content =
            value ?? "";

        setCodeContent((prev) => ({
            ...prev,
            [activeFile]: content,
        }));

        socket.emit(
            "code-update",
            {
                roomId,
                fileId: activeFile,
                content,
            }
        );
    };

    /* =========================================
       LANGUAGE CHANGE
    ========================================= */

    const handleLanguageChange = (
        event
    ) => {
        const newLanguage =
            event.target.value;

        if (!activeFileData) {
            return;
        }

        const config =
            LANGUAGE_OPTIONS[
            newLanguage
            ];

        const baseName =
            activeFileData.name.includes(
                "."
            )
                ? activeFileData.name.substring(
                    0,
                    activeFileData.name.lastIndexOf(
                        "."
                    )
                )
                : activeFileData.name;

        const newName =
            `${baseName}.${config.extension}`;

        const oldContent =
            codeContent[
            activeFile
            ];

        const shouldReplaceBoilerplate =
            !oldContent ||
            oldContent.includes(
                "Start writing your code from here"
            ) ||
            oldContent.includes(
                "Start writing your CSS from here"
            );

        const updatedFile = {
            ...activeFileData,
            name: newName,
            language: newLanguage,
            type: getFileType(newLanguage),
        };

        setFiles((prev) =>
            prev.map((file) =>
                file.id === activeFile
                    ? updatedFile
                    : file
            )
        );

        if (onFileUpdate) {
            onFileUpdate(updatedFile);
        }

        if (
            shouldReplaceBoilerplate
        ) {
            setCodeContent((prev) => ({
                ...prev,
                [activeFile]:
                    BOILERPLATES[
                    newLanguage
                    ],
            }));
        }
    };

    /* =========================================
       NEW FILE
    ========================================= */

    const handleNewFile = () => {
        const fileName =
            window.prompt(
                "Enter file name:",
                "main.java"
            );

        if (!fileName) {
            return;
        }

        const trimmedName =
            fileName.trim();

        if (!trimmedName) {
            return;
        }

        const existingFile =
            files.find(
                (file) =>
                    file.name.toLowerCase() ===
                    trimmedName.toLowerCase()
            );

        if (existingFile) {
            alert(
                "A file with this name already exists."
            );
            return;
        }

        const extension = trimmedName
            .split(".")
            .pop()
            .toLowerCase();

        const language =
            getLanguageFromExtension(
                extension
            );

        const newFile = {
            id:
                `${Date.now()}-${Math.random()}`,
            name: trimmedName,
            type: getFileType(
                language
            ),
            language,
        };

        onCreateFile({
            file: newFile,
            content:
                BOILERPLATES[
                language
                ] || "",
        });
    };

    /* =========================================
       CLOSE FILE
    ========================================= */

    const handleCloseFile = (
        event,
        fileId
    ) => {
        event.stopPropagation();

        if (files.length === 1) {
            return;
        }

        const closingIndex =
            files.findIndex(
                (file) =>
                    file.id === fileId
            );

        const remainingFiles =
            files.filter(
                (file) =>
                    file.id !== fileId
            );

        if (onDeleteFile) {
            onDeleteFile(fileId);
            return;
        }

        setFiles(remainingFiles);

        if (activeFile === fileId) {
            const nextFile =
                remainingFiles[
                closingIndex
                ] ||
                remainingFiles[
                closingIndex - 1
                ] ||
                remainingFiles[0];

            setActiveFile(
                nextFile.id
            );
        }
    };

    /* =========================================
       RUN CODE
    ========================================= */

    const handleRunCode = async () => {
        if (
            !languageConfig ||
            activeLanguage === "css"
        ) {
            setOutput(
                "CSS files cannot be executed directly."
            );

            setShowOutput(true);
            return;
        }

        const code =
            codeContent[activeFile] || "";

        if (!code.trim()) {
            setOutput(
                "Please write some code before running."
            );

            setShowOutput(true);
            return;
        }

        setIsRunning(true);
        setShowOutput(true);
        setOutput("Running...");

        try {
            const response =
                await executeCode({
                    language:
                        activeLanguage,

                    sourceCode: code,

                    stdin: "",
                });

            const result =
                response.data;

            let finalOutput = "";

            if (result.compileOutput) {
                finalOutput +=
                    `Compilation Error:\n${result.compileOutput}\n`;
            }

            if (result.stdout) {
                finalOutput +=
                    `Output:\n${result.stdout}`;
            }

            if (result.stderr) {
                finalOutput +=
                    `\nError:\n${result.stderr}`;
            }

            if (result.message) {
                finalOutput +=
                    `\nMessage:\n${result.message}`;
            }

            if (!finalOutput.trim()) {
                finalOutput =
                    result.status?.description ||
                    "Program executed successfully with no output.";
            }

            setOutput(
                finalOutput
            );
        } catch (error) {
            console.error(
                "Code execution failed:",
                error
            );

            setOutput(
                `Execution failed:\n${error.response?.data
                    ?.message ||
                error.response?.data
                    ?.error?.message ||
                error.message ||
                "Unable to execute code."
                }`
            );
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <section className="code-editor">
            {/* Toolbar */}
            <div className="code-editor-toolbar">
                <div className="code-editor-toolbar-left">
                    <button
                        type="button"
                        className="code-editor-new-file"
                        onClick={
                            handleNewFile
                        }
                    >
                        <FaPlus />
                        New File
                    </button>

                    <select
                        className="code-editor-language-select"
                        value={
                            activeLanguage
                        }
                        onChange={
                            handleLanguageChange
                        }
                    >
                        {Object.entries(
                            LANGUAGE_OPTIONS
                        ).map(
                            ([
                                key,
                                language,
                            ]) => (
                                <option
                                    key={key}
                                    value={key}
                                >
                                    {
                                        language.label
                                    }
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="code-editor-toolbar-right">
                    <button
                        type="button"
                        className="code-editor-run-button"
                        onClick={
                            handleRunCode
                        }
                        disabled={
                            isRunning
                        }
                    >
                        <FaPlay />

                        {isRunning
                            ? "Running..."
                            : "Run Code"}
                    </button>

                    <button
                        type="button"
                        className="code-editor-output-button"
                        onClick={() =>
                            setShowOutput(
                                (prev) =>
                                    !prev
                            )
                        }
                    >
                        <FaTerminal />
                        Output
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div
                className="code-editor-tabs"
                role="tablist"
            >
                {files.map(
                    (file) => (
                        <button
                            type="button"
                            role="tab"
                            key={file.id}
                            aria-selected={
                                activeFile ===
                                file.id
                            }
                            className={`code-editor-tab ${activeFile ===
                                file.id
                                ? "active"
                                : ""
                                }`}
                            onClick={() =>
                                setActiveFile(
                                    file.id
                                )
                            }
                        >
                            <FileIcon
                                type={
                                    file.type
                                }
                            />

                            <span>
                                {file.name}
                            </span>

                            <span
                                className="code-editor-tab-close"
                                role="button"
                                tabIndex={0}
                                onClick={(
                                    event
                                ) =>
                                    handleCloseFile(
                                        event,
                                        file.id
                                    )
                                }
                            >
                                <FaTimes />
                            </span>
                        </button>
                    )
                )}
            </div>

            {/* Editor */}
            <div className="code-editor-surface">
                <div className="code-editor-live-status">
                    {isRemoteUpdate
                        ? "● Remote update"
                        : "● Live"}
                </div>

                <Editor
                    height="100%"
                    language={
                        languageConfig?.monaco ||
                        "javascript"
                    }
                    theme="vs-dark"
                    value={
                        codeContent[
                        activeFile
                        ] || ""
                    }
                    onChange={
                        handleEditorChange
                    }
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        fontSize: 13,
                        lineNumbers: "on",
                        automaticLayout: true,
                        wordWrap: "off",
                        tabSize: 4,
                        padding: {
                            top: 16,
                        },
                        scrollBeyondLastLine:
                            false,
                    }}
                />
            </div>

            {/* Output */}
            {showOutput && (
                <div className="code-editor-output">
                    <div className="code-editor-output-header">
                        <span>
                            <FaTerminal />
                            Output
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                setOutput("")
                            }
                        >
                            Clear
                        </button>
                    </div>

                    <pre>
                        {output ||
                            "Run your code to see the output here."}
                    </pre>
                </div>
            )}
        </section>
    );
}

export default CodeEditor;


