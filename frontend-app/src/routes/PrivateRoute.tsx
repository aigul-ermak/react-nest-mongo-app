import * as React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <p>Loading...</p>;

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
