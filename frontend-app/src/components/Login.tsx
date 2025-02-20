import React, {useState} from "react";
import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";
import {authService} from "../api/api.ts";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext.tsx";


interface LoginForm {
    loginOrEmail: string;
    password: string;
}

export const Login = () => {
    const {register, handleSubmit, reset} = useForm<LoginForm>();
    const navigate = useNavigate();
    const {refreshUser} = useAuth();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: LoginForm) => {
        try {
            await authService.login(data);
            // await refreshUser();
            navigate("/");
        } catch (error) {
            setError(error.message || "Invalid credentials. Try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box textAlign="center" my={4}>
                <Typography variant="h4">Login</Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("loginOrEmail", {required: "Username or Email is required"})}
                    label="Username or Email"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    {...register("password", {required: "Password is required"})}
                    type="password"
                    label="Password"
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Container>
    );
};
