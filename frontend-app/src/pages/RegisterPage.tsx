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
        <Container maxWidth="xs"
                   sx={{
                       marginTop: 8,
                       padding: 3,
                       borderRadius: 2,
                       boxShadow: 3,
                       background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                   }}
        >
            <Typography variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            marginBottom: 3,
                        }}
            >
                Register
            </Typography>
            {error && <Typography color="error"
                                  align="center"
                                  sx={{
                                      marginBottom: 2,
                                  }}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    sx={{
                        marginBottom: 2,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        marginBottom: 2,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        marginBottom: 3,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />
                <Button type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: 1,
                            paddingY: 1.5,
                            fontSize: "1rem",
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                        }}>
                    Register
                </Button>
            </form>
        </Container>
    );
};
