import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from './useAuth';

const GuestOnlyRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const restricted = ['/login', '/signup'];

  if (!loading) {
    return isAuthenticated && !restricted.includes(location.pathname) ? <Outlet /> : <Navigate to="/" />;
  }
};

export default GuestOnlyRoutes;
