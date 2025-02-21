import * as React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost } from "../api/api.ts";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const CreatePostPage = () => {
    const { id } = useParams(); // Blog ID from URL
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: "", shortDescription: "", content: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPost(id, post); // Send post data to API
            navigate(`/blogs/${id}/posts`); // Redirect to blog posts page
        } catch (err) {
            setError("Failed to create post.");
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Create a New Post
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Short Description"
                    name="shortDescription"
                    value={post.shortDescription}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Content"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />

                <Box textAlign="center" mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Create Post
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default CreatePostPage;
