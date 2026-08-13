import { useState } from "react";
import "./WorkspaceLayout.css";
import TopNav from "./TopNav";
import SidebarNav from "./SidebarNav";
import CodeEditor from "./CodeEditor";
import RightPanel from "./RightPanel";
import StatusBar from "./StatusBar";
import WhiteboardPlaceholder from "./WhiteboardPlaceholder";

function WorkspaceLayout() {
    const [activeMode, setActiveMode] = useState("code");
    const [activePanel, setActivePanel] = useState("chat");
    return (
        <div className="workspace-layout">
            <TopNav
                activeMode={activeMode}
                onModeChange={setActiveMode}
            />
            <div className="workspace-body">
                <SidebarNav
                    activeMode={activeMode}
                    onModeChange={setActiveMode}
                    activePanel={activePanel}
                    onPanelChange={setActivePanel}
                />

                <main className="workspace-main">
                    {activeMode === "code" ? (
                        <CodeEditor />
                    ) : (
                        <WhiteboardPlaceholder />
                    )}
                </main>

                <RightPanel
                    activePanel={activePanel}
                    onPanelChange={setActivePanel}
                />
            </div>

            <StatusBar />
        </div>
    );
}

export default WorkspaceLayout;