import * as React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Header = () => {
    const {user, logoutUser} = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>
                    Home
                </Button>
                {/*<Typography variant="h6" sx={{flexGrow: 1}}>*/}
                {/*    Blog App*/}
                {/*</Typography>*/}

                {user ? (
                    <>
                        <Button color="inherit" component={Link} to="/create-blog">
                            Create Blog
                        </Button>
                        <Button color="inherit" onClick={logoutUser}>
                            Logout
                        </Button>
                        <Typography variant="subtitle1" sx={{marginRight: 2}}>
                            Welcome, {user.login}
                        </Typography>
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
