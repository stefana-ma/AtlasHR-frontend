import { Navigate } from "react-router-dom";
import type {JSX} from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role || "")) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;