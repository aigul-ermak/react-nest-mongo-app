import * as React from 'react';
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import LogoutButton from "../components/LogoutButton";

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to Your Dashboard
            </Typography>

            {user ? (
                <Card>
                    <CardContent>
                        <Typography variant="h6">User Info</Typography>
                        <Typography>Email: {user.email}</Typography>
                        <Typography>Login: {user.login}</Typography>
                    </CardContent>
                </Card>
            ) : (
                <Typography color="error">User not found</Typography>
            )}

            <LogoutButton />
        </Container>
    );
};

export default DashboardPage;
