import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Alert } from "@mui/material";
import {loginUser} from "../api/api.ts";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";


interface LoginForm {
    loginOrEmail: string;
    password: string;
}

export const Login = () => {
    const { register, handleSubmit, reset } = useForm<LoginForm>();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginForm) => {
        try {
            await loginUser(data);
            alert("Login successful!");
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
                    {...register("loginOrEmail")}
                    label="Username or Email"
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
                    Login
                </Button>
            </form>
        </Container>
    );
};
