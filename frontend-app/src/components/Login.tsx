import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginForm {
    email: string;
    password: string;
}

export const Login= () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginForm>();
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", data);
            login(response.data.token);
            alert("Login successful!");
            reset();
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid credentials. Try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box textAlign="center" my={4}>
                <Typography variant="h4">Login</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("email", { required: "Email is required" })}
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    {...register("password", { required: "Password is required", minLength: 6 })}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                    Don't have an account?{" "}
                    <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
                        Register here
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};
