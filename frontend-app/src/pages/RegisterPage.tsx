import React, {useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {register} from "../api/api.ts";




export const RegisterPage = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            await register({login, email, password});
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
