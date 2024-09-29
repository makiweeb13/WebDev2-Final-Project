import { Outlet, Navigate } from 'react-router-dom'

export const useAuth = () => {
    // Returns `true` if authenticated, `false` otherwise
    const isAuthenticated = false;
    return isAuthenticated;
  };

const ProtectedRoutes = () => {
    const user = useAuth(); // represents whether a user is logged in
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;