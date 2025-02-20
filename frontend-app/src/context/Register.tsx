import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {authService} from "../api/api.ts";

interface RegisterForm {
    login: string;
    email: string;
    password: string;
}

export const Register = () => {
    const {register, handleSubmit, reset,} = useForm<RegisterForm>();
    const navigate = useNavigate();
    const [error, setError, setServerError] = useState<string | null>(null);

    const onSubmit = async (data: RegisterForm) => {
        try {
            await authService.register(data);
            reset();
            navigate("/login");
        } catch (error) {
            if (error.response?.data?.errorsMessages) {
                const errorMessage = error.response.data.errorsMessages
                    .map((err: { message: string }) => err.message)
                    .join("\n");
                setError(errorMessage);
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box textAlign="center" my={4}>
                <Typography variant="h4">Register</Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("login")}
                    label="Username"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    {...register("email",)}
                    label="Email"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    {...register("password")}
                    type="password"
                    label="Password"
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
        </Container>
    );
};
