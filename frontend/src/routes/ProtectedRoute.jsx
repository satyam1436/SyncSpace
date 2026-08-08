import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Wait until authentication/session restoration is complete
    if (isLoading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0F172A",
                    color: "#F8FAFC",
                }}
            >
                <p>Checking authentication...</p>
            </div>
        );
    }

    // User is not authenticated
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // User is authenticated
    return <Outlet />;
};

export default ProtectedRoute;