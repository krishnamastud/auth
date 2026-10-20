import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'


const PublicRoutes = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/main/dashboard" replace />
    }
    // return <Navigate to="/" replace />

  return <Outlet />
}

export default PublicRoutes