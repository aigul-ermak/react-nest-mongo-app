import * as React from 'react';
import {Button} from "@mui/material";
import {useAuth} from "../context/AuthContext";

const LogoutButton = () => {
    const {logoutUser} = useAuth();

    return (
        <Button variant="contained" color="secondary" onClick={logoutUser}>
            Logout
        </Button>
    );
};

export default LogoutButton;
