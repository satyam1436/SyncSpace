// import { Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/register";
// import CreateRoomPage from "./pages/CreateRoomPage";
// import "./App.css";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<SignupPage />} />
//       <Route path="/create-room" element={<CreateRoomPage />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/register";
import CreateRoomPage from "./pages/CreateRoomPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/create-room" element={<CreateRoomPage />} />
      </Route>
    </Routes>
  );
}

export default App;