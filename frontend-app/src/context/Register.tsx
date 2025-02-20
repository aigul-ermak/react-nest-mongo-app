import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../api/api.ts";

interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

export const Register = () => {
    const { register, handleSubmit, reset } = useForm<RegisterForm>();
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterForm) => {
        try {
            await registerUser(data);
            alert("Registration successful! You can now log in.");
            reset();
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box textAlign="center" my={4}>
                <Typography variant="h4">Register</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("login")}
                    label="Username"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    {...register("email", )}
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
