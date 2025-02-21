import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {api, register} from "../api/api.ts";


interface RegisterForm {
    login: string;
    email: string;
    password: string;
}

export const RegisterPage = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // const {register, handleSubmit, reset,} = useForm<RegisterForm>();
    // const navigate = useNavigate();
    // const [error, setError, setServerError] = useState<string | null>(null);

    // const onSubmit = async (data: RegisterForm) => {
    //     try {
    //         await register({ login, email, password });
    //         reset();
    //         navigate("/login");
    //     } catch (error) {
    //         if (error.response?.data?.errorsMessages) {
    //             const errorMessage = error.response.data.errorsMessages
    //                 .map((err: { message: string }) => err.message)
    //                 .join("\n");
    //             setError(errorMessage);
    //         } else {
    //             setError("Registration failed. Please try again.");
    //         }
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register({ login, email, password });
            navigate("/login");
        } catch (err) {
            setError("Registration failed. User may already exist.");
        }
    };


    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
        </Container>
    );
};
