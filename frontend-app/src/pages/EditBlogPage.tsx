import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { getBlogById, updateBlog } from "../api/api.ts";

const EditBlogPage = () => {
    const { id } = useParams(); // Get blog ID from URL
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(id);
                if (data) {
                    setTitle(data.title || "");
                    setDescription(data.description || "");
                } else {
                    setError("Blog not found.");
                }
            } catch (err) {

                setError("Failed to load blog details.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            await updateBlog(id, title, description);
            navigate("/"); // Redirect to dashboard after updating
        } catch (err) {
            setError("Failed to update blog. Please try again.");
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Edit Blog
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Blog Title"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Blog
                </Button>
            </form>
        </Container>
    );
};

export default EditBlogPage;
