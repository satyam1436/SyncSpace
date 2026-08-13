import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/register";
import CreateRoomPage from "./pages/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import RoomNotFoundPage from "./pages/RoomNotFoundPage";
import RoomLoadingPage from "./pages/RoomLoadingPage";
import NotFound404Page from "./pages/NotFound404Page";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";
import WorkspacePage from "./pages/WorkspacePage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/create-room" element={<CreateRoomPage />} />
      <Route path="/join-room" element={<JoinRoomPage />} />
      <Route path="/room-not-found" element={<RoomNotFoundPage />} />
      <Route path="/room-loading" element={<RoomLoadingPage />} />
      <Route path="/404" element={<NotFound404Page />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/create-room" element={<CreateRoomPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/workspace" element={<WorkspacePage />} />
      </Route>

      {/* Catch-all: any unknown route shows 404 */}
      <Route path="*" element={<NotFound404Page />} />
    </Routes>
  );
}

export default App;