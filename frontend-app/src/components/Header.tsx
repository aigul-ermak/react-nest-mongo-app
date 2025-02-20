import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <AppBar position="static" sx={{ width: "100%" }}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Blog Platform
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/logout">Logout</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
            </Toolbar>
        </AppBar>
    );
};