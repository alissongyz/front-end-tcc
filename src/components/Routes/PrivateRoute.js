import React from 'react'

import { Navigate, Outlet } from 'react-router'

const PrivateRoute = () => {
    const isLogged = !!localStorage.getItem('x-access-token')

    return isLogged ? <Outlet /> : <Navigate to="/" />
 }

export default PrivateRoute;

