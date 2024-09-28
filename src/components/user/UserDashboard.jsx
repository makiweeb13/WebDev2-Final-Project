import React from 'react';
import UserHeader from './UserHeader';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom'

function UserDashboard() {
    return (
        <>
            <UserHeader />
            <Outlet />
            <Footer />
        </>
    )
}

export default UserDashboard;