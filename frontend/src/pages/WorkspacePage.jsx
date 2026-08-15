// import WorkspaceLayout from "../components/workspace/WorkspaceLayout";

// function WorkspacePage() {
//     return <WorkspaceLayout />;
// }

// export default WorkspacePage;

import { useParams } from "react-router-dom";
import WorkspaceLayout from "../components/workspace/WorkspaceLayout";

function WorkspacePage() {
    const { roomId } = useParams();

    return (
        <WorkspaceLayout roomId={roomId} />
    );
}

export default WorkspacePage;