import * as React from 'react';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Container, TextField, Typography} from "@mui/material";
import {createBlog} from "../api/api.ts";

const CreateBlogPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            await createBlog(title, description);
            navigate("/"); // Redirect to dashboard after creating a blog
        } catch (err) {
            setError("Failed to create blog. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm"
                   sx={{
                       marginTop: 4,
                       padding: 3,
                       borderRadius: 2,
                       boxShadow: 3,
                       background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                   }}>
            <Typography variant="h4" align="center" gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            marginBottom: 3,
                        }}>
                Create a Blog
            </Typography>
            {error && <Typography color="error" align="center"
                                  sx={{
                                      marginBottom: 2,
                                  }}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Blog Title"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        marginBottom: 2,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        marginBottom: 3,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth
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
                    Create Blog
                </Button>
            </form>
        </Container>
    );
};

export default CreateBlogPage;
