import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

export const Header1 = () => {
    // const navigate = useNavigate();
    // const isLoggedIn = !!localStorage.getItem("token");
    const { user, isAuthenticated, logout, isLoading } = useAuth();
    // const handleLogout = () => {
    //     logoutUser();
    //     navigate("/login");
    // };
    if (isLoading) {
        return null; // Hide header until auth state is loaded
    }

    return (
        <AppBar position="static" sx={{width: "100%"}}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Blog Platform
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>

                {isAuthenticated ? (
                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography>Welcome, {user?.login}!</Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Box>
                ) : (
                    <Box display="flex" gap={1}>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};