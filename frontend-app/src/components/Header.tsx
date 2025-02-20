import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Typography, Box} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {logoutUser} from "../api/api.ts";

export const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <AppBar position="static" sx={{ width: "100%" }}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Blog Platform
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>

                {isLoggedIn ? (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                ) : (
                    <> {}
                        <Box display="flex" gap={1}>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </Box>
                    </>
                )}

            </Toolbar>
        </AppBar>
    );
};