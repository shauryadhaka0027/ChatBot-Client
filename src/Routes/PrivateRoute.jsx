import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const checkValidate = JSON.parse(localStorage.getItem("userLogin"));

 
    const isAuthenticated = checkValidate !== null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  
}

export default PrivateRoute
