import * as React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.tsx";
import DashboardPage from "../pages/DashboardPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import {RegisterPage} from "../pages/RegisterPage.tsx";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <DashboardPage/>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
