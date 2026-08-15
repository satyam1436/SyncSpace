import {
    FaChevronDown,
    FaChevronRight,
    FaFileCode,
    FaFileAlt,
    FaFile,
    FaPlus,
} from "react-icons/fa";

import "./FileExplorer.css";

function getFileIcon(file) {
    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();

    if (
        ["js", "jsx", "ts", "tsx", "java", "cpp", "c", "py", "go", "rs"].includes(
            extension
        )
    ) {
        return <FaFileCode />;
    }

    if (
        ["md", "txt"].includes(
            extension
        )
    ) {
        return <FaFileAlt />;
    }

    return <FaFile />;
}

function FileExplorer({
    files,
    activeFile,
    onFileSelect,
    onCreateFile,
}) {
    return (
        <div className="file-explorer">
            <div className="file-explorer-header">
                <span>Explorer</span>
            </div>

            <div className="file-explorer-list">
                <div className="file-explorer-root">
                    <button
                        type="button"
                        className="file-explorer-item folder"
                    >
                        <FaChevronDown />

                        <span>
                            workspace
                        </span>
                    </button>

                    <div className="file-explorer-children">
                        {files.map(
                            (file) => (
                                <button
                                    type="button"
                                    className={`file-explorer-item file ${activeFile ===
                                        file.id
                                        ? "active"
                                        : ""
                                        }`}
                                    key={
                                        file.id
                                    }
                                    onClick={() =>
                                        onFileSelect(
                                            file.id
                                        )
                                    }
                                >
                                    {getFileIcon(
                                        file
                                    )}

                                    <span>
                                        {
                                            file.name
                                        }
                                    </span>
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileExplorer;