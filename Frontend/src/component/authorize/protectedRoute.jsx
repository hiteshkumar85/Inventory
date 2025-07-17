import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify'

const ProtectedRoute = ({ allowedFor = [] }) => {
    const location = useLocation();
    const token = localStorage.getItem("token");

    const isPublicRoute = allowedFor.length === 0;

    if (!token) {
        if (isPublicRoute) return <Outlet />;
        return <Navigate to="/" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            toast.warn("Token has expired. Please login again!")
            return <Navigate to="/" replace />;
        }

        if (!isPublicRoute && !allowedFor.includes(decoded.role)) {
            toast.warn("Unauthorized user access!")
            return <Navigate to="/unauthorized" replace />;
        }

        if (isPublicRoute && location.pathname === "/") {
            return <Navigate to="/welcome" replace />;
        }

        return <Outlet />;
    } catch (error) {
        toast.error("Something went wrong!");
        return <Navigate to="/" replace />;
    }
};


export default ProtectedRoute;
