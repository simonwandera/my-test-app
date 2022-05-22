import { useLocation, Navigate, Outlet } from "react-router-dom";


const RequireAuth = ({ userType }) => {
    const location = useLocation();

    console.log(userType)

    return (
        userType && userType === 'ADMIN'
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;