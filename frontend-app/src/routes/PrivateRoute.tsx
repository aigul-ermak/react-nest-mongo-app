import * as React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

interface PrivateRouteProps {
    children: React.ReactNode;
}

// const PrivateRoute = ({ children }) => {
const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const {user, isLoading} = useAuth();

    if (isLoading) return <p>Loading...</p>;

    return user ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;
