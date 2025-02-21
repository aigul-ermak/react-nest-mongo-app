import * as React from 'react';
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { user, logoutUser } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>

                {user ? (
                    <>
                        <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
                            Welcome, {user.login}
                        </Typography>
                        <Button color="inherit" onClick={logoutUser}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};
export default Header;
