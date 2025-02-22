
import {AppBar, Button, Toolbar, Typography, Box} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Header = () => {
    const {user, logoutUser} = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>
                    All blogs
                </Button>

                {user ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <Button color="inherit" component={Link} to="/create-blog" sx={{ marginRight: 2 }}>
                            Create Blog
                        </Button>
                        <Button color="inherit" onClick={logoutUser} sx={{ marginRight: 2 }}>
                            Logout
                        </Button>
                        <Typography variant="subtitle1" sx={{ marginLeft: 2, fontWeight: 'bold', color: 'secondary.main' }}>
                            Welcome, {user.login}
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};
export default Header;
