import * as React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.tsx";
import DashboardPage from "../pages/DashboardPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import {RegisterPage} from "../pages/RegisterPage.tsx";
import CreateBlogPage from "../pages/CreateBlogPage.tsx";
import EditBlogPage from "../pages/EditBlogPage.tsx";
import BlogDetailsPage from "../pages/BlogDetailsPage.tsx";
import BlogPostsPage from "../pages/BlogPostPage.tsx";


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
            <Route
                path="/create-blog"
                element={
                    <PrivateRoute>
                        <CreateBlogPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/edit-blog/:id"
                element={
                    <PrivateRoute>
                        <EditBlogPage />
                    </PrivateRoute>
                }
            />
            <Route path="/blogs/:id/posts" element={<BlogPostsPage />} />
        </Routes>
    );
};

export default AppRoutes;
