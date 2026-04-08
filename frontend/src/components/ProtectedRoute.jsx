import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/jwt";

const ProtectedRoute = ({ children, roleRequired }) => {
    const user = getUserFromToken();

    if (!user) return <Navigate to="/login" />;

    if (roleRequired && user.role !== roleRequired) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;