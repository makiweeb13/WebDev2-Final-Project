import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const user = true // represents whether a user is logged in
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;