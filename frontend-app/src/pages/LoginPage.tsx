import * as React from 'react';
import {useState} from 'react';
import {useAuth} from "../context/AuthContext";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const {loginUser} = useAuth();
    const [loginOrEmail, setLoginOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await loginUser(loginOrEmail, password);
            navigate("/");
        } catch (err) {
            setError("Invalid login credentials");
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
                        }}>
                Login
            </Typography>
            {error && <Typography color="error"
                                  align="center"
                                  sx={{
                                      marginBottom: 2,
                                  }}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Login or Email"
                    margin="normal"
                    value={loginOrEmail}
                    onChange={(e) => setLoginOrEmail(e.target.value)}
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
                        }}
                >
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default LoginPage;
